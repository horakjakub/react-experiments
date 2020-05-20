import React, {ReactElement, useState} from 'react';
import styled from 'styled-components';
import {VideoChannelType} from 'hooks/useVideoChannels/useVideoChannels';
import Videos from 'components/Videos/Videos';

const VideoChannelWrapper = styled.div`
  display: flex;
  &:hover {
    background: grey;
  }
`;

function VideoChannel({
  title,
  description,
  thumbnailUrl,
  id,
}: VideoChannelType): ReactElement {
  const [showVideos, setShowVideos] = useState(false);

  return (
    <>
      <VideoChannelWrapper onClick={ ()=> setShowVideos(!showVideos)}>
        <img src={thumbnailUrl} width="240" height="180" />
        <h4> {title} </h4>
        <p> {description} </p>
      </VideoChannelWrapper>
      {showVideos && <Videos id={id} />}
    </>
  );
}

export default VideoChannel;
