import React, {ReactElement, useState} from 'react';
import styled from 'styled-components';
import {VideoChannelType} from 'hooks/useVideoChannels/useVideoChannels';
import Videos from 'components/Videos/Videos';

const VideoChannelWrapper = styled.div`
  display: inline-flex;
  background: white;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  &:hover {
    background: grey;
  }
`;

const Description = styled.section`
  padding: 0 1em;
  height: 10em;
  h3 { 
    font-size: 2em;
    font-family:'PT Sans', sans-serif;
  }
`;

const Figure = styled.figure`
  margin: 0;
  img {
    width: 36em;
    height: 36em;
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
      <VideoChannelWrapper onClick={() => setShowVideos(!showVideos)}>
        <Figure>
          <img src={thumbnailUrl} />
        </Figure>
        <Description>
          <h3> {title} </h3>
          <p> {description} </p>
        </Description>
      </VideoChannelWrapper>
      {showVideos && <Videos id={id} />}
    </>
  );
}

export default VideoChannel;
