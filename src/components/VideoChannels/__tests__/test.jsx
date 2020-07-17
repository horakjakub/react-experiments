import React, {ChangeEvent} from 'react';
import {render, fireEvent, screen, createEvent} from '@testing-library/react';
import useVideoChannels from 'hooks/useVideoChannels';
import VideoChannels from '../index';

jest.mock('hooks/useVideoChannels');

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
    const {container} = render(
      <VideoChannels wrapperRef={wrapper} searchPhrase="kitty" />,
      {
        container: document.body.appendChild(wrapper),
      },
    );

    screen.debug();
  });
});
