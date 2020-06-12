import React from 'react';

import GlobalStyle from 'global-styles';
import ChannelDetailsModal from './styled';
import {VideosMock} from 'utils/mock-utils';
import {generateMockVideoChannelData} from 'components/VideoChannels/helpers';

export default {
  title: 'Channel Details Modal',
  component: ChannelDetailsModal,
};

const videoChannelMock = generateMockVideoChannelData('a');

export const DefaultChannelDetailsModal = () => (
  <>
    <GlobalStyle />
    <ChannelDetailsModal {...videoChannelMock} videos={VideosMock} />
  </>
);

export const ChannelDetailsModalWithSpinner = () => (
  <>
    <GlobalStyle />
    <ChannelDetailsModal {...videoChannelMock} isLoading />
  </>
);
