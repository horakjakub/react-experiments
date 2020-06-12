import React, {
  ReactElement,
  useState,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import {differenceWith, isEqual} from 'lodash';
import styled from 'styled-components';
import VideoChannel from 'components/VideoChannel/VideoChannel';
import Spinner from 'components/Spinner/Spinner';
import useVideoChannels, {
  mapToVideoChannels,
  VideoChannelType,
} from 'hooks/useVideoChannels/useVideoChannels';
import useDebounce from 'hooks/useDebounce/useDebounce';
import useIsElementBottomVisible from 'hooks/useIsElementBottomVisible/useIsElementBottomVisible';

export default VideoChannels;

export const VideoChannelsBox = styled.div`
`;

export const VideoChannelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36em, 1fr));
  gap: 2em;
  margin: 1em;
`;


const ResultsPlaceholder = styled.div`
  width: 36em;
  height: 44em;
  margin: 1.5em 1em 1em 1em;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2.4em;
    font-family: 'Lato', sans-serif;
    color: pink;
    padding: 1em;
    text-align: center;
  }
`;

export function VideoChannelsContentWrapper({
  children,
  isLoading,
  isNoMoreResults,
  searchPhrase,
}: {
  children: ReactElement;
  isLoading: boolean;
  isNoMoreResults: boolean;
  searchPhrase: string;
}) {
  return (
    <VideoChannelsBox>
      <VideoChannelsGrid>
        {children}
        {isLoading && (
          <ResultsPlaceholder>
            <Spinner size={'6em'} color={'pink'} />
          </ResultsPlaceholder>
        )}
        {isNoMoreResults && (
          <ResultsPlaceholder>
            <p>Oops, there is no more results for "{searchPhrase}".</p>
          </ResultsPlaceholder>
        )}
      </VideoChannelsGrid>
    </VideoChannelsBox>
  );
}

type Props = {
  searchPhrase: string;
  wrapperRef: RefObject<HTMLElement>;
};

type CurrentSearch = {
  phrase: string | null;
  results: VideoChannelType[];
  nextPageId: string | null;
};

function VideoChannels({searchPhrase, wrapperRef}: Props): ReactElement {
  const [shouldSearch, setShouldSearch] = useState<boolean>(true);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [nextPageId, setNextPageId] = useState<string | null>(null);
  const {isVisible} = useIsElementBottomVisible(wrapperRef);
  const {debouncedPhrase} = useDebounce(searchPhrase);
  const {response, isLoading} = useVideoChannels(
    shouldSearch ? debouncedPhrase : null,
    20,
    nextPageId,
  );

  useEffect(() => {
    if (response) {
      const {nextPageToken} = response;
      const newChannels = differenceWith(
        mapToVideoChannels(response),
        videoChannels,
        isEqual,
      );

      if (newChannels.length) {
        setVideoChannels([...videoChannels, ...newChannels]);
      }

      if (nextPageToken !== nextPageId) {
        setNextPageId(nextPageToken ? nextPageToken : 'none');
      }

      if (lastSearchPhrase !== debouncedPhrase) {
        setLastSearchPhrase(debouncedPhrase);
        setVideoChannels([]);
      }

      setShouldSearch(isVisible || lastSearchPhrase !== debouncedPhrase);
    }
  }, [
    response,
    videoChannels,
    nextPageId,
    isVisible,
    debouncedPhrase,
    lastSearchPhrase,
  ]);

  return (
    <VideoChannelsContentWrapper
      isLoading={isLoading}
      searchPhrase={searchPhrase}
      isNoMoreResults={nextPageId === 'none'}>
      <>
        {videoChannels.map(videoChannelProps => (
          <VideoChannel {...videoChannelProps} key={videoChannelProps.id} />
        ))}
      </>
    </VideoChannelsContentWrapper>
  );
}
