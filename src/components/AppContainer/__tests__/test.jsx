import React, {ChangeEvent} from 'react';
import {render, fireEvent, screen, createEvent} from '@testing-library/react';
import AppContainer from '../index';

const videoChannelsWrapperTestId = 'video-channels-wrapper'; 

describe('<AppContainer />', () => {
  it('renders correctly', () => {
    const {container} = render(<AppContainer />);
    expect(container).toMatchSnapshot();
  });

  it('shouldn`t show video channels wrapper by default', () => {
    const { queryByTestId } = render(<AppContainer />);
    const videoChannelWrapperEl = queryByTestId(videoChannelsWrapperTestId);

    expect(videoChannelWrapperEl).toBeNull();
  });

  it('shouldn`t show video channels if search phrase is shorter than three', () => {
    const { queryByTestId, getByPlaceholderText } = render(<AppContainer />);
    const searchEl = getByPlaceholderText('start typing to search');
    const changeEvent = createEvent.change(searchEl, {target: {value: 'ca'}});

    fireEvent.change(searchEl, changeEvent);

    const videoChannelWrapperEl = queryByTestId(videoChannelsWrapperTestId);
    expect(videoChannelWrapperEl).toBeNull();
  });

  it('should show video channels if search phrase is longer than two', () => {
    const { queryByTestId, getByPlaceholderText } = render(<AppContainer />);
    const searchEl = getByPlaceholderText('start typing to search');
    const changeEvent = createEvent.change(searchEl, {target: {value: 'cat'}});

    fireEvent.change(searchEl, changeEvent);

    const videoChannelWrapperEl = queryByTestId(videoChannelsWrapperTestId);
    expect(videoChannelWrapperEl).toBeTruthy();
  });
});

