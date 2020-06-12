type YTResponse = {
  // eslint-ignore-next-line
  [key: string]: any;
};

export type YTSearchResponseChannel = {
  nextPageToken: string;
  items: {
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }[];
};

export default YTResponse;
