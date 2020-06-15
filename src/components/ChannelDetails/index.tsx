import React, {ReactElement, SyntheticEvent} from 'react';
import {createPortal} from 'react-dom';
import VideoType from 'common-types/video.type';
import Spinner from 'components/Spinner';
import Video from 'components/Video';
import useVideos from 'hooks/useVideos';
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
} from './styled';

export default ChannelDetailsModalWithPortal;

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  closeModal: () => void;
};

function witchOnDirectClick(func: () => void) {
  return (e: SyntheticEvent) =>
    e.target === e.currentTarget ? func() : undefined;
}

export function ChannelDetailsModal({
  id,
  title,
  thumbnailUrl,
  description,
  closeModal,
}: Props): ReactElement {
  const {response, isLoading} = useVideos(id);
  const videos = response || [];

  return (
    <Blanket onClick={witchOnDirectClick(closeModal)}>
      <CloseButton onClick={witchOnDirectClick(closeModal)}>X</CloseButton>
      <Modal>
        <Content>
          <Header>
            <Img src={thumbnailUrl} />
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

function ChannelDetailsModalWithPortal(props: Props): ReactElement {
  return createPortal(<ChannelDetailsModal {...props} />, document.body);
}
