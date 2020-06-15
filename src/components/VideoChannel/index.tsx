import React, {ReactElement, useState} from 'react';
import {VideoChannelType} from 'common-types/video-channel.type';
import DetailsModal from 'components/ChannelDetails';
import {
  VideoChannelWrapper,
  VideoChannelBox,
  Figure,
  Img,
  Description,
} from './styled';

export default VideoChannel;

function VideoChannel({
  title,
  description,
  thumbnailUrl,
  id,
}: VideoChannelType): ReactElement {
  const [showVideos, setShowVideos] = useState<boolean>(false);

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
        <DetailsModal
          closeModal={() => {
            setShowVideos(false);
          }}
          id={id}
          title={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
        />
      )}
    </>
  );
}
