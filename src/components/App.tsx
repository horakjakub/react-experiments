import React, {Suspense, ReactElement} from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import Spinner from 'components/Spinner/Spinner';
import {
  SearchVideoChannelContextProvider,
  SearchVideoChannelContext,
} from 'services/SearchChannelProvider/SearchChannelProvider';
import VideoChannels from 'components/VideoChannels/VideoChannels';

const App = () => {
  return (
    <SearchVideoChannelContextProvider>
      <Suspense fallback={<Spinner />}>
        <SearchBar setSearchPhrase={() => {}} />
      </Suspense>
      <div>
        <SearchVideoChannelContext.Consumer>
          {({phrase}) => {
            if (phrase.length > 2) {
              return <VideoChannels searchPhrase={phrase} />;
            }
            return null;
          }}
        </SearchVideoChannelContext.Consumer>
      </div>
    </SearchVideoChannelContextProvider>
  );
};

export default App;
