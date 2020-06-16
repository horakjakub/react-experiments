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

export default VideoChannelWithModal;

function VideoChannelWithModal(props: VideoChannelType): ReactElement {
  const [showVideos, setShowVideos] = useState<boolean>(false);

  return (
    <>
      <VideoChannel onClick={() => setShowVideos(!showVideos)} {...props} />
      {showVideos && (
        <DetailsModal
          closeModal={() => {
            setShowVideos(false);
          }}
          {...props}
        />
      )}
    </>
  );
}

type Props = VideoChannelType & {
  onClick: () => void;
};

export function VideoChannel({
  onClick,
  title,
  description,
  thumbnailUrl,
}: Props): ReactElement {
  return (
    <VideoChannelWrapper onClick={onClick}>
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
  );
}
