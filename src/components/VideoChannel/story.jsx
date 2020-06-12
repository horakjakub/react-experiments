import React from 'react';
import GlobalStyle from 'global-styles';
import VideoChannel from './VideoChannel';

export default {
  title: 'VideoChannel',
  component: VideoChannel,
};

export const SingleVideoChannel = () => (
  <>
    <GlobalStyle />
      <VideoChannel
        id="cat"
        title="Cool title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nunc eget massa nunc. Nulla tellus massa, malesuada vulputate velit
      nec, mollis vulputate tellus. Integer pretium vulputate purus, et
      vulputate odio egestas non. Morbi ultrices lectus eu blandit euismod.
       Nunc eget massa nunc. Nulla tellus massa, malesuada vulputate velit
      nec, mollis vulputate tellus. Integer pretium vulputate purus, et
      vulputate odio egestas non. Morbi ultrices lectus eu blandit euismod.
      Donec orci massa, feugiat nec maximus non, tristique at velit.
      Phasellus hendrerit odio ut lobortis faucibus. "
        thumbnailUrl="https://yt3.ggpht.com/-_p81gJCwoJA/AAAAAAAAAAI/AAAAAAAAAAA/1j_w8z5jhxs/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
      />
  </>
);
