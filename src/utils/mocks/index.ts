import { videosMockData } from "./videos.mock-data";
import { VideoType } from "common-types/video.type";
import YTResponse, {
  YTSearchResponseChannel,
} from "common-types/yt-response.type";
import { VideoChannelType } from "common-types/video-channel.type";
import videoChannelsData from "./video-channels.mock-data";
import searchResponseMock from "./search-response.mock-data";
import channelsResposneMock from "./channels-response.mock-data";
import videosResponseMock from "./videos-response.mock-data";
import playlistItemsResponseMock from "./channels-response.mock-data";

export const videoChannelsMock: VideoChannelType[] = videoChannelsData;

export const videosMock: VideoType[] = videosMockData.map((v, idx: number) => ({
  ...v,
  id: `${idx}`,
})) as VideoType[];

export const videoChannelsApiResponse: YTSearchResponseChannel = searchResponseMock as YTSearchResponseChannel;

export function getModifiedSearchResponseMock(
  response: YTSearchResponseChannel,
  modifier: number
): YTSearchResponseChannel {
  const responseCopy = JSON.parse(JSON.stringify(response));
  responseCopy.nextPageToken = modifier;
  responseCopy.items = responseCopy.items.map((item: any) => {
    item.snippet.channelId = `${item.snippet.channelId}${modifier}`;
    return item;
  });
  return responseCopy;
}

type ResponseMock<T> = Promise<{ json: () => Promise<T> }>;

export function fetchMock<T>(url: string, response: T): ResponseMock<T> {
  console.log(`started fetch for url: ${url}`);

  const jsonResponseMock = new Promise<T>((resolve) => {
    resolve(response);
    console.log(`delivered response for: ${url}`);
  });

  const rawResponseMock = {
    json: function (): Promise<T> {
      return jsonResponseMock;
    },
  };

  return new Promise<{ json: () => Promise<T> }>((resolve) =>
    setTimeout(() => resolve(rawResponseMock), 200 + Math.random() * 100)
  );
}

let counter = 0;

export function fetchMockBasedOnUrl(url: string): ResponseMock<YTResponse> {
  if (url.includes("channels")) {
    return fetchMock(url, channelsResposneMock);
  }
  if (url.includes("playlistItems")) {
    return fetchMock(url, playlistItemsResponseMock);
  }
  if (url.includes("videos")) {
    return fetchMock(url, videosResponseMock);
  }
  if (url.includes("search")) {
    counter++;
    return fetchMock(
      url,
      getModifiedSearchResponseMock(videoChannelsApiResponse, counter)
    );
  }
  return fetchMock(url, {});
}
