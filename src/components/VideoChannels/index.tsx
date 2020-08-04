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
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [nextPageId, setNextPageId] = useState<string | null>(null);
  const {
    isVisible: isBottomBorderVisible,
    setIsElementChanged,
  } = useIsElementBottomVisible(wrapperRef);

  const {debouncedPhrase} = useDebounce(searchPhrase);
  const {response, isLoading} = useVideoChannels(
    shouldSearch && videoChannels.length < 30 ? debouncedPhrase : null,
    20,
    nextPageId,
  );

  useEffect(() => {
    setShouldSearch(
      (isBottomBorderVisible &&
        videoChannels.length &&
        nextPageId !== 'none') ||
        lastSearchPhrase !== debouncedPhrase,
    );

    if (lastSearchPhrase !== debouncedPhrase) {
      setLastSearchPhrase(debouncedPhrase);
      setVideoChannels([]);
    }

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
      setIsElementChanged(true);
    } else {
      setIsElementChanged(false);
    }
  }, [
    response,
    videoChannels,
    nextPageId,
    isBottomBorderVisible,
    debouncedPhrase,
    lastSearchPhrase,
    setIsElementChanged
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
