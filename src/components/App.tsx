import React, {Suspense, ReactElement, useRef, useEffect} from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import Spinner from 'components/Spinner/Spinner';
import {
  SearchVideoChannelContextProvider,
  SearchVideoChannelContext,
} from 'services/SearchChannelProvider/SearchChannelProvider';
import VideoChannels from 'components/VideoChannels/VideoChannels';
import GlobalStyle from 'global-styles';

const App = () => {
  const searchResultsWrapperEl = useRef(null);

  return (
    <SearchVideoChannelContextProvider>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <SearchBar setSearchPhrase={() => {}} />
      </Suspense>
      <div ref={searchResultsWrapperEl}>
        <SearchVideoChannelContext.Consumer>
          {({phrase}) => {
            if (phrase.length > 2) {
              return (
                <VideoChannels
                  searchPhrase={phrase}
                  wrapperRef={searchResultsWrapperEl}
                />
              );
            }
            return null;
          }}
        </SearchVideoChannelContext.Consumer>
      </div>
    </SearchVideoChannelContextProvider>
  );
};

export default App;
