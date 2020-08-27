import React, { ReactElement, useState } from "react";
import { VideoType } from "common-types/video.type";
import Video from "components/Video";
import Spinner from "common-components/Spinner";
import Modal from "common-components/Modal";
import ImgError from "common-components/ImgError";
import useVideos from "hooks/useVideos";
import {
  Container,
  Img,
  VideosBox,
  Header,
  Title,
  Description,
  Hr,
  Content,
  VideosPlaceholder,
} from "./styled";

export default ChannelDetailsModalWithVideos;

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  closeModal: () => void;
};

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
    <Modal closeModal={closeModal}>
      <Container>
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
      </Container>
    </Modal>
  );
}
