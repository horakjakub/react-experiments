import React, { useRef } from "react";
import SearchBar from "components/SearchBar";
import {
  SearchVideoChannelContextProvider,
  SearchVideoChannelContext,
} from "providers/search-channel.provider";
import VideoChannels from "components/VideoChannels";
import GlobalStyles from "global-styles";

function AppContainer() {
  const searchResultsWrapperEl = useRef<HTMLDivElement>(null);
  return (
    <SearchVideoChannelContextProvider>
      <GlobalStyles />
      <SearchBar />
      <div ref={searchResultsWrapperEl}>
        <SearchVideoChannelContext.Consumer>
          {({ phrase }) => {
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
}

export default AppContainer;
