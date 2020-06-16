import React from 'react';
import GlobalStyle from 'global-styles';

export default story => (
  <>
    <GlobalStyle /> 
    { story() }
  </>
);
