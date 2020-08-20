import { useState, useEffect } from "react";
import useFetch, { ApiResponseType } from "hooks/useFetch";
import { VideoType } from "common-types/video.type";
import YTResponse from "common-types/yt-response.type";
import {
  getYTApiPlaylistItemsUrl,
  getYTApiChannelUrl,
  getYTApiVideosUrl,
} from "utils/yt-url.helpers";

function mapYTResponseToPlaylistId(response: YTResponse | null): string {
  return response?.items[0]?.contentDetails?.relatedPlaylists?.uploads;
}

function mapYTResponseToVideosId(response: YTResponse | null): string[] {
  return response?.items?.map(
    ({ contentDetails }: { contentDetails: { videoId: string } }) =>
      contentDetails.videoId
  );
}

function mapYTResponseToVideos(response: YTResponse | null): VideoType[] {
  return response?.items?.map(
    ({
      id,
      snippet: {
        title,
        description,
        thumbnails: {
          high: { url: thumbnailUrl },
        },
        tags,
      },
    }: YTResponse) => ({
      id,
      title,
      description,
      thumbnailUrl,
      tags,
    })
  );
}

function useVideos(id: string): ApiResponseType<VideoType[]> {
  const [areLoading, setAreLoading] = useState<boolean>(false);
  const [
    {
      response: channelResponse,
      error: channelError,
      isLoading: channelIsLoading,
    },
  ] = useFetch<YTResponse>({
    initialUrl: getYTApiChannelUrl(id),
  });

  const playlistId = mapYTResponseToPlaylistId(channelResponse);

  const [
    {
      response: playlistResponse,
      error: playlistError,
    },
  ] = useFetch<YTResponse>({
    initialUrl: playlistId ? getYTApiPlaylistItemsUrl(playlistId, 6) : "",
  });

  const videosIds = mapYTResponseToVideosId(playlistResponse);

  const [{ response, error }] = useFetch<YTResponse>({
    initialUrl:
      videosIds && videosIds.length ? getYTApiVideosUrl(...videosIds) : "",
  });

  useEffect(() => {
    if(channelIsLoading) setAreLoading(true);
    if(response || channelError || playlistError || error) setAreLoading(false);
  }, [channelIsLoading, response, channelError, playlistError, error]);

  return {
    response: mapYTResponseToVideos(response),
    error: channelError || playlistError || error,
    isLoading: areLoading 
  };
}

export default useVideos;