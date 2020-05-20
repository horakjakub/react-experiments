import React, {ReactElement} from 'react';
import VideoChannel from 'components/VideoChannel/VideoChannel';
import Spinner from 'components/Spinner/Spinner';
import useVideoChannels from 'hooks/useVideoChannels/useVideoChannels';
import useDebounce from 'hooks/useDebounce/useDebounce';

export default VideoChannels;

type Props = {
  searchPhrase: string;
};

function VideoChannels({searchPhrase}: Props): ReactElement {
  const {debouncedPhrase} = useDebounce(searchPhrase);
  const {response, isLoading} = useVideoChannels(debouncedPhrase, 5);

  return (
    <>
      {response && !isLoading ? (
        response.map(videoChannelProps => (
          <VideoChannel {...videoChannelProps} key={videoChannelProps.id} />
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
}
