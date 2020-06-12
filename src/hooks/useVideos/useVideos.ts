import useFetch, {ApiResponseType} from 'hooks/useFetch';
import {
  getYTApiPlaylistItemsUrl,
  getYTApiChannelUrl,
  getYTApiVideosUrl,
} from 'utils/getYTApiUrl';

type YTResponse = {
  [key: string]: any;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
};

function mapYTResponseToPlaylistId(response: YTResponse | null): string {
  return response?.items[0]?.contentDetails?.relatedPlaylists?.uploads;
}

function mapYTResponseToVideosId(response: YTResponse | null): string[] {
  return response?.items?.map(
    ({contentDetails}: {contentDetails: {videoId: string}}) =>
      contentDetails.videoId,
  );
}

function mapYTResponseToVideos(response: YTResponse | null): Video[] {
  return response?.items?.map(
    ({
      id,
      snippet: {
        title,
        description,
        thumbnails: {
          high: {url: thumbnailUrl},
        },
        tags,
      },
    }: any) => ({id, title, description, thumbnailUrl, tags}),
  );
}

function useVideos(id: string | null): ApiResponseType<Video[]> {
  const {
    response: channelResponse,
    error: channelError,
    isLoading: channelIsLoading,
  } = useFetch<YTResponse>({url: id ? getYTApiChannelUrl(id) : null});

  const playlistId = mapYTResponseToPlaylistId(channelResponse);

  const {
    response: playlistResponse,
    error: playlistError,
    isLoading: playlistIsLoading,
  } = useFetch<YTResponse>({
    url: playlistId ? getYTApiPlaylistItemsUrl(playlistId, 6) : null,
  });

  const videosIds = mapYTResponseToVideosId(playlistResponse);

  const {response, error, isLoading} = useFetch<YTResponse>({
    url: videosIds && videosIds.length ? getYTApiVideosUrl(...videosIds) : null,
  });

  return {
    response: mapYTResponseToVideos(response),
    error: channelError || playlistError || error,
    isLoading: channelIsLoading || playlistIsLoading || isLoading,
  };
}

export default useVideos;
