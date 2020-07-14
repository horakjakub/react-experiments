import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import GlobalStyle from 'global-styles/storybook-decorator';
import {Search} from './index';

export default {
  title: 'Search Bar',
  decorators: [GlobalStyle],
};

export const SearchBarDefault = () => {
  const [phrase, setPhrase] = useState('');

  return (
    <Search
      setPhrase={text => {
        action('typed')(text);
        setPhrase(text);
      }}
      phrase={phrase}
    />
  );
};
