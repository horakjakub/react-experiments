import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import GlobalStyle from 'global-styles/storybook-decorator';
import {SearchBar} from './index';

export default {
  title: 'Search Bar',
  decorators: [GlobalStyle],
};

export const SearchBarDefault = () => {
  const [phrase, setPhrase] = useState('');

  return (
    <SearchBar
      setPhrase={text => {
        action('typed')(text);
        setPhrase(text);
      }}
      phrase={phrase}
    />
  );
};
