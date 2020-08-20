import React, { ReactElement, useState, RefObject, useEffect } from "react";
import { differenceWith, isEqual } from "lodash";
import VideoChannelWithModal from "components/VideoChannel";
import Spinner from "components/Spinner";
import useVideoChannels, { mapToVideoChannels } from "hooks/useVideoChannels";
import { VideoChannelType } from "common-types/video-channel.type";
import useDebounce from "hooks/useDebounce";
import useIsElementBottomVisible from "hooks/useIsElementBottomVisible";
import { VideoChannelsGrid, ResultsPlaceholder } from "./styled";

export default VideoChannels;

export function VideoChannelsWrapper({
  children,
  isLoading,
  isNoMoreResults,
  searchPhrase,
}: {
  children: ReactElement;
  isLoading: boolean;
  isNoMoreResults: boolean;
  searchPhrase: string;
}) {
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
    </VideoChannelsGrid>
  );
}

type Props = {
  searchPhrase: string;
  wrapperRef: RefObject<HTMLElement>;
};

const FIRST_PAGE_ID = "firstPageId";

function VideoChannels({ searchPhrase, wrapperRef }: Props): ReactElement {
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [pageId, setPageId] = useState<string>(FIRST_PAGE_ID);
  const {
    isVisible: isBottomBorderVisible,
    setIsElementChanged,
  } = useIsElementBottomVisible(wrapperRef);
  const [requestedPages, setRequestedPages] = useState<string[]>([pageId]);
  const { throttledDebouncedPhrase } = useDebounce(searchPhrase);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(
    throttledDebouncedPhrase
  );

  const [{ response, isLoading, error }, doFetch] = useVideoChannels();

  useEffect(() => {
    const isPageAlreadyRequested = requestedPages.includes(pageId)
      ? true
      : false;

    const phraseChanged = lastSearchPhrase !== throttledDebouncedPhrase;

    const willSearch =
      pageId !== "none" &&
      !isLoading &&
      !error &&
      !isPageAlreadyRequested &&
      !!throttledDebouncedPhrase &&
      (phraseChanged ||
        !videoChannels.length ||
        (!!videoChannels.length && isBottomBorderVisible));

    if (phraseChanged) {
      setLastSearchPhrase(throttledDebouncedPhrase);
      setVideoChannels([]);
      setRequestedPages([]);
      setPageId(FIRST_PAGE_ID);
    }

    if (willSearch) {
      setRequestedPages([...requestedPages, pageId]);
      doFetch(throttledDebouncedPhrase || "", 20, pageId === FIRST_PAGE_ID ? null : pageId);
    }
  }, [
    throttledDebouncedPhrase,
    isBottomBorderVisible,
    pageId,
    videoChannels,
    error,
    lastSearchPhrase,
    requestedPages,
    isLoading,
    doFetch,
  ]);

  useEffect(() => {
    if (!response) return setIsElementChanged(false);

    const newChannels = differenceWith(
      mapToVideoChannels(response),
      videoChannels,
      isEqual
    );

    if (newChannels.length) {
      setVideoChannels([...videoChannels, ...newChannels]);
    }

    const { nextPageToken } = response; 
    if (nextPageToken !== pageId) {
      setPageId(nextPageToken || "none");
    }

    setIsElementChanged(true);
  }, [response, videoChannels, pageId, setIsElementChanged]);

  return (
    <VideoChannelsWrapper
      isLoading={isLoading}
      searchPhrase={searchPhrase}
      isNoMoreResults={pageId === "none"}
    >
      <>
        {videoChannels.map((videoChannelProps) => (
          <VideoChannelWithModal
            {...videoChannelProps}
            key={videoChannelProps.id}
          />
        ))}
      </>
    </VideoChannelsWrapper>
  );
}
