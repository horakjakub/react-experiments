import React from 'react';
import {action} from '@storybook/addon-actions';
import GlobalStyle from 'global-styles/storybook-decorator';
import {VideoChannel} from 'components/VideoChannel';
import {videoChannelsMock} from 'utils/mocks';
import {VideoChannelsWrapper} from './index';

export default {
  title: 'Video Channels',
  decorators: [GlobalStyle],
};

export const VideoChannelsDefault = () => (
  <VideoChannelsWrapper>
    {videoChannelsMock.map(video => (
      <VideoChannel
        onClick={action(`${video.title} clicked`)}
        {...video}
        key={video.id}
      />
    ))}
  </VideoChannelsWrapper>
);

export const VideoChannelsLoading = () => <VideoChannelsWrapper isLoading />;

export const VideoChannelsNoMoreResults = () => (
  <VideoChannelsWrapper isNoMoreResults />
);
