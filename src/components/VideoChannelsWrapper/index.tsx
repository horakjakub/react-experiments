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

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
    }
  }, [error, showErrorMessage]);

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
      {!isLoading &&
        error &&
        error.message.includes("403") &&
        showErrorMessage && (
          <Modal
            closeModal={() => {
              setShowErrorMessage(false);
            }}
          >
            <ErrorContainer>
              <h2>403 Error</h2>
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
