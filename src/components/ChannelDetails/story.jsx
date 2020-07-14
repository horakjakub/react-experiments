import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import {videoChannelsMock, videosMock} from 'utils/mocks';
import {ChannelDetailsModal} from './index';

export default {
  title: 'Channel Details Modal',
  decorators: [GlobalStyle],
};

export const ChannelDetailsModalDefault = () => (
  <ChannelDetailsModal {...videoChannelsMock[0]} videos={videosMock} />
);

export const ChannelDetailsLowerVideosCount = () => (
  <ChannelDetailsModal
    videos={videosMock.slice(0, 3)}
    {...videoChannelsMock[0]}
  />
);

export const ChannelDetailsModalLoading = () => (
  <ChannelDetailsModal {...videoChannelsMock[0]} isLoading />
);
