import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {debounce} from 'lodash';
import useFetch, {ApiResponseType} from 'hooks/useFetch';
import {getYTApiSearchUrl} from 'utils/getYTApiUrl';

export type VideoChannelType = {
  title: string;
  description: string;
  id: string;
  thumbnailUrl: string;
};

type YTSearchResponseChannel = {
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

export function mapToVideoChannels(
  response: YTSearchResponseChannel | null,
): VideoChannelType[] {
  return response?.items
    ? response.items.map(({snippet}) => ({
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
  pageToken: string | null,
): ApiResponseType<YTSearchResponseChannel | null> {
  const {response, error, isLoading} = useFetch<YTSearchResponseChannel>({
    url: searchPhrase
      ? getYTApiSearchUrl(searchPhrase, resultsNo || 1, pageToken || undefined)
      : ''
  });

  return {
    response,
    error,
    isLoading,
  };
}

export default useVideoChannels;
