import React, {ReactElement, SyntheticEvent} from 'react';
import {createPortal} from 'react-dom';
import {Video as VideoType} from 'hooks/useVideos/useVideos';
import Spinner from 'components/Spinner/Spinner';
import Video from 'components/Video/Video';
import useVideos from 'hooks/useVideos/useVideos';
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
  videos?: VideoType[];
  isLoading?: boolean;
  closeModal: () => void;
};

function witchOnDirectClick(func: () => void) {
  return function (e: SyntheticEvent) {
    return e.target === e.currentTarget ? func() : undefined;
  };
}

export function ChannelDetailsModal({
  id,
  title,
  thumbnailUrl,
  description,
  isLoading,
  closeModal,
}: Props): ReactElement {
  const {response, isLoading: isFetching } = useVideos(id);
  const videos = response ? response : [];

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
          {isFetching && (
            <VideosPlaceholder>
              <Spinner size={'6em'} color={'pink'} />
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
