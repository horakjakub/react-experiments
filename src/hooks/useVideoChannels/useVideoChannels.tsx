import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {debounce} from 'lodash';

export type VideoChannelType = {
  title: string,
  description: string,
  id: string,
  thumbnailUrl: string,
};

type YTSearchResponseChannel = {
  items:
  {
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
    }
  }[];
};

type parseRepsonseFunc = (
  response: YTSearchResponseChannel
) => VideoChannelType[];

const parseResponse: parseRepsonseFunc = response => response
  .items
  .map(
    ({snippet}) => ({
      title: snippet.channelTitle,
      id: snippet.channelId,
      description: snippet.description,
      thumbnailUrl: snippet.thumbnails.high.url,
    }));

const debouncedSearch =
  debounce<(searchPhrase: string, pageSize: number, setVideoChannelsFromResponse: (response: YTSearchResponseChannel) => void) => void>(
    (searchPhrase, pageSize, setVideoChannelsFromResponse) => {
      if (searchPhrase.length > 2) {
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=channel&q=${searchPhrase}&maxResults=${pageSize}`)
          .then(res => res.json())
          .then(setVideoChannelsFromResponse);
      }
    }, 300);

const useVideoChannels: (pageSize?: number) => {videoChannels: VideoChannelType[], setSearchPhrase: Dispatch<SetStateAction<string>>}
  = (pageSize = 5) => {
    const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
    const [searchPhrase, setSearchPhrase] = useState<string>('');

    useEffect(() => debouncedSearch(searchPhrase, pageSize, (response) => {setVideoChannels(parseResponse(response));}), [searchPhrase]);

    return {
      videoChannels,
      setSearchPhrase,
    };
  };

export default useVideoChannels;


