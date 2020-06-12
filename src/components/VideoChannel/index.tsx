import React, {ReactElement, useState} from 'react';
import styled from 'styled-components';
import VideoChannelType from 'common-types/video-channel.type';
import ChannelDetailsModal from 'components/ChannelDetails';
import {
  VideoChannelWrapper,
  VideoChannelBox,
  Figure,
  Img,
  Description,
} from './styled';
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
        <VideoChannelBox>
          <Figure>
            <Img src={thumbnailUrl} />
          </Figure>
          <Description>
            <h3> {title} </h3>
            <p> {description} </p>
          </Description>
        </VideoChannelBox>
      </VideoChannelWrapper>
      {showVideos && (
        <ChannelDetailsModal
          closeModal={() => {
            setShowVideos(false);
          }}
          id={id}
          title={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
          isLoading
        />
      )}
    </>
  );
}

export default VideoChannel;
