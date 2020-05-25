import React, {
  ReactElement,
  useState,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import {differenceWith, isEqual} from 'lodash';
import VideoChannel from 'components/VideoChannel/VideoChannel';
import Spinner from 'components/Spinner/Spinner';
import useVideoChannels, {
  mapToVideoChannels,
  VideoChannelType,
} from 'hooks/useVideoChannels/useVideoChannels';
import useDebounce from 'hooks/useDebounce/useDebounce';
import useIsElementBottomVisible from 'hooks/useIsElementBottomVisible/useIsElementBottomVisible';
import isElementBottomInViewPort from 'utils/isElementBottomVisibileInViewport';

export default VideoChannels;

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
    5,
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
        setNextPageId(nextPageToken);
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
    <>
      {videoChannels.map(videoChannelProps => (
        <VideoChannel {...videoChannelProps} key={videoChannelProps.id} />
      ))}
      {isLoading && <Spinner />}
      {isVisible && !nextPageId && <div> There is no more results </div>}
    </>
  );
}
