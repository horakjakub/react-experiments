import React, {ChangeEvent} from 'react';
import {
  render,
  fireEvent,
  screen,
  createEvent,
  act,
} from '@testing-library/react';
import useVideoChannels from 'hooks/useVideoChannels';
import useIsElementBottomVisible from 'hooks/useIsElementBottomVisible';
import useDebounce from 'hooks/useDebounce';

import VideoChannels from '../index';

jest.mock('hooks/useVideoChannels');
jest.mock('hooks/useIsElementBottomVisible');
jest.mock('hooks/useDebounce');

describe('<VideoChannels />', () => {
  it('renders correctly', () => {
    const wrapper = document.createElement('div');
    const {container} = render(<VideoChannels wrapperRef={wrapper} />, {
      container: document.body.appendChild(wrapper),
    });

    expect(container).toMatchSnapshot();
  });

  it('should start search when search phrase is passed', () => {
    const wrapper = document.createElement('div');
    useVideoChannels.mockReturnValue({response: {nextPageToken: 'dog'}});

    const {container} = render(
      <VideoChannels wrapperRef={wrapper} searchPhrase="kitty" />,
      {
        container: document.body.appendChild(wrapper),
      },

      //expect().toBe(true);
    );
  });

  it('should clear results previous results when search phrase is changed', () => {});

  it('should search once if a bottom border of <VideoChannels> is not visible', () => {});

  it('should continue search if a bottom border of <VideoChannels /> is visible', () => {});

  it('should stop search if a bottom border of <VideoChannels /> is not visible', () => {});

  it('should start search if a bottom border of <VideoChannels /> container started to be visible', () => {});

  it('should show loading indicator when search is in progress', () => {});

  it('shouldn`t show loading indicator when search is not in progress', () => {});

  it('should show loading indicator when search is in progress', () => {});

  it('shouldn`t show loading indicator when search is not in progress', () => {});
});
