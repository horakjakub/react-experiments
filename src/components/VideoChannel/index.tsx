import React, { ReactElement, useState, memo } from "react";
import { VideoChannelType } from "common-types/video-channel.type";
import DetailsModal from "components/ChannelDetails";
import ImgError from "common-components/ImgError";
import {
  VideoChannelWrapper,
  VideoChannelBox,
  Figure,
  Img,
  Description,
} from "./styled";

export default memo(VideoChannelWithModal);

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
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <VideoChannelWrapper onClick={onClick}>
      <VideoChannelBox>
        <Figure>
          {isImgError ? (
            <ImgError size={"big"} />
          ) : (
            <Img
              onError={(e) => {
                setIsImgError(true);
              }}
              src={thumbnailUrl}
            />
          )}
        </Figure>
        <Description>
          <h3> {title} </h3>
          <p> {description} </p>
        </Description>
      </VideoChannelBox>
    </VideoChannelWrapper>
  );
}