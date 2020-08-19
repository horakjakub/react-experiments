import useFetch, { ApiResponseType } from "hooks/useFetch";
import { getYTApiSearchUrl } from "utils/yt-url.helpers";
import { VideoChannelType } from "common-types/video-channel.type";
import { YTSearchResponseChannel } from "common-types/yt-response.type";

export function mapToVideoChannels(
  response: YTSearchResponseChannel | null
): VideoChannelType[] {
  return response?.items
    ? response.items.map(({ snippet }) => ({
        title: snippet.channelTitle,
        id: snippet.channelId,
        description: snippet.description,
        thumbnailUrl: snippet.thumbnails.high.url,
      }))
    : [];
}

function useVideoChannels(
  searchPhrase: string | null,
  resultsNo: number,
  pageToken: string | null
): ApiResponseType<YTSearchResponseChannel | null> {
  const { response, error, isLoading } = useFetch<YTSearchResponseChannel>({
    url: searchPhrase
      ? getYTApiSearchUrl(searchPhrase, resultsNo || 1, pageToken || undefined)
      : "",
  });

  return {
    response,
    error,
    isLoading,
  };
}

export default useVideoChannels;
