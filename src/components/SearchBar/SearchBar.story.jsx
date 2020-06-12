import React from 'react';
import GlobalStyle from 'global-styles';
import {SearchBar} from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
};
export const DefaultSearchBar = () => (
  <>
    <GlobalStyle />
    <SearchBar />
  </>
);
