import React, { ReactElement, useState, useEffect } from "react";
import Spinner from "common-components/Spinner";
import Modal from "common-components/Modal";
import {
  VideoChannelsGrid,
  ResultsPlaceholder,
  ErrorContainer,
} from "./styled";

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
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(true);
  const [currentError, setCurrentError] = useState<Error>();

  useEffect(() => {
    if (error && currentError !== error) {
      setShowErrorMessage(true);
      setCurrentError(error);
    }
  }, [error, currentError, setCurrentError, showErrorMessage]);

  return (
    <VideoChannelsGrid data-testid="video-channels-wrapper">
      {children}
      {isLoading && (
        <ResultsPlaceholder>
          <Spinner size="6em" color="pink" />
        </ResultsPlaceholder>
      )}
      {(isNoMoreResults || error) && (
        <ResultsPlaceholder>
          <p>Oops, there is no results for "{searchPhrase}".</p>
        </ResultsPlaceholder>
      )}
      {!isLoading && error && showErrorMessage && (
        <Modal
          closeModal={() => {
            setShowErrorMessage(false);
          }}
        >
          <ErrorContainer>
            <h2>Error</h2>
            <p>
              Sorry. If you see this message, the app probably exceeded the
              YouTube API quota limit. If you would like to use an app with
              mocked data check README.MD file on an app Github page.
            </p>
          </ErrorContainer>
        </Modal>
      )}
    </VideoChannelsGrid>
  );
}
