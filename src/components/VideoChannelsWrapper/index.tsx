import React, { ReactElement } from "react";
import Spinner from "components/Spinner";
import { VideoChannelsGrid, ResultsPlaceholder } from "./styled";

export default VideoChannelsWrapper;

type Props = {
  children: ReactElement;
  isLoading: boolean;
  isNoMoreResults: boolean;
  searchPhrase: string;
  error: Error | null;
};

function VideoChannelsWrapper({
  children,
  isLoading,
  isNoMoreResults,
  searchPhrase,
  error,
}: Props) {
  return (
    <VideoChannelsGrid data-testid="video-channels-wrapper">
      {children}
      {isLoading && (
        <ResultsPlaceholder>
          <Spinner size="6em" color="pink" />
        </ResultsPlaceholder>
      )}
      {isNoMoreResults && (
        <ResultsPlaceholder>
          <p>Oops, there is no results for "{searchPhrase}".</p>
        </ResultsPlaceholder>
      )}
      {error && error.message.includes("403") && <div>Error message</div>}
    </VideoChannelsGrid>
  );
}
