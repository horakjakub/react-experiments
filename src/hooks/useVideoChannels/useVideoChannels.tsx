import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {debounce} from 'lodash';
import useFetch, {ApiResponseType} from 'hooks/useFetch';
import { getYTApiSearchUrl } from 'utils/getYTApiUrl';

export type VideoChannelType = {
  title: string;
  description: string;
  id: string;
  thumbnailUrl: string;
};

type YTSearchResponseChannel = {
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

type parseRepsonseFunc = (
  response: YTSearchResponseChannel,
) => VideoChannelType[];

const parseResponse: parseRepsonseFunc = response =>
  response.items.map(({snippet}) => ({
    title: snippet.channelTitle,
    id: snippet.channelId,
    description: snippet.description,
    thumbnailUrl: snippet.thumbnails.high.url,
  }));

function useVideoChannels(
  searchPhrase: string | null,
  resultsNo: number,
): ApiResponseType<VideoChannelType[]> {
  const {response, error, isLoading} = useFetch<YTSearchResponseChannel>(
    searchPhrase ? getYTApiSearchUrl(searchPhrase, resultsNo) : null,
  );
  return {
    response: response !== null ? parseResponse(response) : null,
    error,
    isLoading,
  };
}

export default useVideoChannels;
