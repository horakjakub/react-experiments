import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import {ChannelDetailsModal} from './index';
import {videoChannelsMock, videosMock} from 'utils/mocks';

export default {
  title: 'Channel Details Modal',
  decorators: [GlobalStyle],
};

export const ChannelDetailsModalDefault = () => (
  <ChannelDetailsModal {...videoChannelsMock[0]} videos={videosMock} />
);

export const ChannelDetailsModalLoading = () => (
  <ChannelDetailsModal {...videoChannelsMock[0]} isLoading />
);

