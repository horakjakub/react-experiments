import React, {ReactElement, useState, RefObject, useEffect} from 'react';
import {differenceWith, isEqual} from 'lodash';
import VideoChannel from 'components/VideoChannel';
import Spinner from 'components/Spinner';
import useVideoChannels, {
  mapToVideoChannels,
} from 'hooks/useVideoChannels/useVideoChannels';
import VideoChannelType from 'common-types/video-channel.type';
import useDebounce from 'hooks/useDebounce/useDebounce';
import useIsElementBottomVisible from 'hooks/useIsElementBottomVisible/useIsElementBottomVisible';
import {VideoChannelsGrid, ResultsPlaceholder} from './styled';

export default VideoChannels;

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
