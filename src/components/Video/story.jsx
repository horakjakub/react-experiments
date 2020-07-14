import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import {videosMock} from 'utils/mocks';
import Video from './index';

export default {
  title: 'Video',
  decorators: [GlobalStyle],
};

export const VideoDefault = () => <Video {...videosMock[0]} />;

export const VideoMultiple = () =>
  videosMock.map(v => <Video key={v.id} {...v} />);
