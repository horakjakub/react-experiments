import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import {action} from '@storybook/addon-actions';
import {videoChannelsMock} from 'utils/mocks';
import {VideoChannel} from './index';

export default {
  title: 'Video Channel',
  decorators: [GlobalStyle],
};

export const VideoChannelDefault = () => (
  <VideoChannel {...videoChannelsMock[0]} onClick={action('clicked')} />
);
