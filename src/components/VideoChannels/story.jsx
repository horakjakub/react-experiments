import React from 'react';
import GlobalStyle from 'global-styles';
import VideoChannel from 'components/VideoChannel/VideoChannel';
import {
  VideoChannelsContentWrapper,
} from './VideoChannels';
import {generateMockVideoChannelData} from './helpers';

export default {
  title: 'VideoChannels',
  component: VideoChannelsContentWrapper,
};

export const DefaultVideoChannels = () => (
  <>
    <GlobalStyle />
    <VideoChannelsContentWrapper>
      {['a', 'b', 'c', 'd', 'e', 'f'].map(id => (
          <VideoChannel {...generateMockVideoChannelData(id)} />
      ))}
    </VideoChannelsContentWrapper>
  </>
);

export const VideoChannelsWithLoader = () => (
  <>
    <GlobalStyle />
    <VideoChannelsContentWrapper isLoading>
      {['a', 'b', 'c', 'd', 'e', 'f'].map(id => (
          <VideoChannel {...generateMockVideoChannelData(id)} />
      ))}
    </VideoChannelsContentWrapper>
  </>
);

export const VideoChannelsWithNoMoreResults = () => (
  <>
    <GlobalStyle />
    <VideoChannelsContentWrapper isNoMoreResults searchPhrase="cat">
      {['a', 'b', 'c', 'd', 'e', 'f'].map(id => (
          <VideoChannel {...generateMockVideoChannelData(id)} />
      ))}
    </VideoChannelsContentWrapper>
  </>
);


