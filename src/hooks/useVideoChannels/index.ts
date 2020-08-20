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

function useVideoChannels(): [
  ApiResponseType<YTSearchResponseChannel | null>,
  (searchPhrase: string, resultsNo: number, pageToken: string | null) => void
] {
  const [{ response, error, isLoading }, doFetch] = useFetch<
    YTSearchResponseChannel
  >({
    initialUrl: "",
  });

  return [
    {
      response,
      error,
      isLoading,
    },
    (searchPhrase, resultsNo, pageToken) => {
      doFetch(
        getYTApiSearchUrl(searchPhrase, resultsNo || 1, pageToken || undefined)
      );
    },
  ];
}

export default useVideoChannels;
