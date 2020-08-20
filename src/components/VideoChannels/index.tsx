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

function VideoChannels({ searchPhrase, wrapperRef }: Props): ReactElement {
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [pageId, setPageId] = useState<string>("firstPageId");
  const {
    isVisible: isBottomBorderVisible,
    setIsElementChanged,
  } = useIsElementBottomVisible(wrapperRef);
  const [requestedPages, setRequestedPages] = useState<string[]>([]);

  const { throttledDebouncedPhrase } = useDebounce(searchPhrase);
  const { response, isLoading, error } = useVideoChannels(
    shouldSearch ? throttledDebouncedPhrase : null,
    20,
    pageId === "firstPageId" ? null : pageId
  );

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
      ((!!throttledDebouncedPhrase && phraseChanged) ||
        (!!throttledDebouncedPhrase &&
          !!videoChannels.length &&
          isBottomBorderVisible));

    if (phraseChanged) {
      setLastSearchPhrase(throttledDebouncedPhrase);
      setVideoChannels([]);
      setRequestedPages([]);
      setPageId("firstPageId");
    }

    if (willSearch) {
      setRequestedPages([...requestedPages, pageId]);
    }

    setShouldSearch(willSearch);
  }, [throttledDebouncedPhrase, isBottomBorderVisible, response]);

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
  }, [response]);

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
