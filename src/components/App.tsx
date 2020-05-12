import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import {SearchVideoChannelContextProvider, SearchVideoChannelContext} from '../services/SearchChannelProvider/SearchChannelProvider';
import useVideoChannels, { VideoChannelType} from '../hooks/useVideoChannels/useVideoChannels';

const App = () => {
  const {setSearchPhrase, videoChannels} = useVideoChannels(10);
  return (
    <>
      <SearchVideoChannelContextProvider>
        <SearchBar setSearchPhrase={setSearchPhrase} />
        <div>
          <SearchVideoChannelContext.Consumer>
            {({phrase}) => (
              <div>
                {phrase}
              </div>
            )}
          </SearchVideoChannelContext.Consumer>
        </div>
        {
          videoChannels.map((videoChannel: VideoChannelType) => (<div> {videoChannel.title}</div>))
        }
      </SearchVideoChannelContextProvider>
    </>
  )
};

export default App;
