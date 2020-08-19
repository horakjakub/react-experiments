import React, { ReactElement, SyntheticEvent, useState } from "react";
import { createPortal } from "react-dom";
import { VideoType } from "common-types/video.type";
import Spinner from "components/Spinner";
import Video from "components/Video";
import { ImgError } from "common-components";
import useVideos from "hooks/useVideos";
import {
  Blanket,
  CloseButton,
  Modal,
  Img,
  VideosBox,
  Header,
  Title,
  Description,
  Hr,
  Content,
  VideosPlaceholder,
} from "./styled";

export default ChannelDetailsModalWithPortal;

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  closeModal: () => void;
};

function ChannelDetailsModalWithPortal(props: Props): ReactElement {
  return createPortal(
    <ChannelDetailsModalWithVideos {...props} />,
    document.body
  );
}

function ChannelDetailsModalWithVideos(props: Props): ReactElement {
  const { id } = props;
  const { response, isLoading } = useVideos(id);
  const videos = response || [];
  return (
    <ChannelDetailsModal {...props} videos={videos} isLoading={isLoading} />
  );
}

type ChannelDetailModalProps = Props & {
  videos: VideoType[];
  isLoading: boolean;
};

export function ChannelDetailsModal({
  title,
  thumbnailUrl,
  description,
  closeModal,
  videos,
  isLoading,
}: ChannelDetailModalProps): ReactElement {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <Blanket onClick={witchOnDirectClick(closeModal)}>
      <CloseButton onClick={witchOnDirectClick(closeModal)}>X</CloseButton>
      <Modal>
        <Content>
          <Header>
            {isImgError ? (
              <ImgError size={"small"} />
            ) : (
              <Img onError={() => setIsImgError(true)} src={thumbnailUrl} />
            )}
            <Title> {title} </Title>
          </Header>
          <Hr />
          <Description>{description}</Description>
        </Content>
        <VideosBox>
          {isLoading && (
            <VideosPlaceholder>
              <Spinner size="6em" color="pink" />
            </VideosPlaceholder>
          )}
          {videos &&
            videos.map((video: VideoType) => (
              <Video key={video.id} {...video} />
            ))}
        </VideosBox>
      </Modal>
    </Blanket>
  );
}

function witchOnDirectClick(func: () => void): (e: SyntheticEvent) => void {
  return (e: SyntheticEvent) =>
    e.target === e.currentTarget ? func() : undefined;
}
