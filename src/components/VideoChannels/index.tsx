import React, {ReactElement, useState, RefObject, useEffect} from 'react';
import {differenceWith, isEqual} from 'lodash';
import VideoChannelWithModal from 'components/VideoChannel';
import Spinner from 'components/Spinner';
import useVideoChannels, {mapToVideoChannels} from 'hooks/useVideoChannels';
import {VideoChannelType} from 'common-types/video-channel.type';
import useDebounce from 'hooks/useDebounce';
import useIsElementBottomVisible from 'hooks/useIsElementBottomVisible';
import {VideoChannelsGrid, ResultsPlaceholder} from './styled';

export default VideoChannels;

export function VideoChannelsWrapper({
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
    <VideoChannelsGrid data-testid="video-channels-wrapper">
      {children}
      {isLoading && (
        <ResultsPlaceholder>
          <Spinner size="6em" color="pink" />
        </ResultsPlaceholder>
      )}
      {isNoMoreResults && (
        <ResultsPlaceholder>
          <p>Oops, there is no results for "{searchPhrase}".</p>
        </ResultsPlaceholder>
      )}
    </VideoChannelsGrid>
  );
}

type Props = {
  searchPhrase: string;
  wrapperRef: RefObject<HTMLElement>;
};

function VideoChannels({searchPhrase, wrapperRef}: Props): ReactElement {
  const [shouldSearch, setShouldSearch] = useState<boolean>(true);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [nextPageId, setNextPageId] = useState<string | null>(null);
  const {isVisible: isWrapperBottomVisible} = useIsElementBottomVisible(
    wrapperRef,
  );

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
        setNextPageId(nextPageToken || 'none');
      }

      if (lastSearchPhrase !== debouncedPhrase) {
        setLastSearchPhrase(debouncedPhrase);
        setVideoChannels([]);
      }

      setShouldSearch(
        isWrapperBottomVisible || lastSearchPhrase !== debouncedPhrase,
      );
    }
  }, [
    response,
    videoChannels,
    nextPageId,
    isWrapperBottomVisible,
    debouncedPhrase,
    lastSearchPhrase,
  ]);

  return (
    <VideoChannelsWrapper
      isLoading={isLoading}
      searchPhrase={searchPhrase}
      isNoMoreResults={nextPageId === 'none'}>
      <>
        {videoChannels.map(videoChannelProps => (
          <VideoChannelWithModal
            {...videoChannelProps}
            key={videoChannelProps.id}
          />
        ))}
      </>
    </VideoChannelsWrapper>
  );
}
