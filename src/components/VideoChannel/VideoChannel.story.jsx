import React from 'react';
import {GlobalStyle} from 'components/App';
import VideoChannel from './VideoChannel';

export default {
  title: 'VideoChannel',
  component: VideoChannel,
};

export const VideoChannelStory = () => (
  <>
    <GlobalStyle />
    <VideoChannel
      id="cat"
      title="Cool title"
      description="Video series straight from compomton"
      thumbnailUrl="https://yt3.ggpht.com/-_p81gJCwoJA/AAAAAAAAAAI/AAAAAAAAAAA/1j_w8z5jhxs/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
    />
  </>
);
