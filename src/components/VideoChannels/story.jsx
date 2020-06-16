import React from 'react';
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
      <VideoChannel {...video} key={video.id} />
    ))}
  </VideoChannelsWrapper>
);

export const VideoChannelsLoading = () => <VideoChannelsWrapper isLoading />;

export const VideoChannelsNoMoreResults = () => (
  <VideoChannelsWrapper isNoMoreResults />
);
