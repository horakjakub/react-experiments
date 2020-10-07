import React, { ReactElement, useState, RefObject, useEffect } from "react";
import { differenceWith, isEqual } from "lodash";
import VideoChannelWithModal from "components/VideoChannel";
import VideoChannelsWrapper from "components/VideoChannelsWrapper";
import useVideoChannels, { mapToVideoChannels } from "hooks/useVideoChannels";
import { VideoChannelType } from "common-types/video-channel.type";
import useThrottleDebounce from "hooks/useThrottleDebounce";
import useIsElementBottomVisible from "hooks/useIsElementBottomVisible";

export default VideoChannels;

type Props = {
  searchPhrase: string;
  wrapperRef: RefObject<HTMLElement>;
};

const FIRST_PAGE_ID = "firstPageId";

function areMoreResultsForSearch(
  pageId: string,
  isSearchPhraseChanged: boolean
): boolean {
  return !(pageId === "none" && !isSearchPhraseChanged);
}

function isBottomBorderStartedToBeVisible(
  videoChannelsCount: number,
  isBottomBorderVisible: boolean
) {
  return !!videoChannelsCount && isBottomBorderVisible;
}

function VideoChannels({ searchPhrase, wrapperRef }: Props): ReactElement {
  const [videoChannels, setVideoChannels] = useState<VideoChannelType[]>([]);
  const [pageId, setPageId] = useState<string>(FIRST_PAGE_ID);
  const {
    isVisible: isBottomBorderVisible,
    elementChanged: containerElementChanged,
  } = useIsElementBottomVisible(wrapperRef);
  const { throttledDebouncedPhrase } = useThrottleDebounce(searchPhrase);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [lastResponseId, setLastResponseId] = useState<string>();
  const [{ response, isLoading, error }, doFetch] = useVideoChannels();
  const [isPhraseChanged, setPhraseChanged] = useState<boolean>(true);
  // add useContext
  useEffect(() => {
    if (
      areMoreResultsForSearch(pageId, isPhraseChanged) &&
      !isLoading &&
      !!throttledDebouncedPhrase &&
      (isPhraseChanged ||
        isBottomBorderStartedToBeVisible(
          videoChannels.length,
          isBottomBorderVisible
        ))
    ) {
      doFetch(
        throttledDebouncedPhrase || "",
        20,
        pageId === FIRST_PAGE_ID || isPhraseChanged ? null : pageId
      );
    }
  }, [
    isBottomBorderVisible,
    pageId,
    videoChannels,
    isLoading,
    doFetch,
    throttledDebouncedPhrase,
    isPhraseChanged,
  ]);

  useEffect(() => {
    const isSearchPhraseChanged = lastSearchPhrase !== throttledDebouncedPhrase;
    setPhraseChanged(isSearchPhraseChanged);

    if (isSearchPhraseChanged) {
      window.scrollTo(0, 0);
      setLastSearchPhrase(throttledDebouncedPhrase);
      setVideoChannels([]);
      setPageId(FIRST_PAGE_ID);
    }
  }, [lastSearchPhrase, throttledDebouncedPhrase]);

  useEffect(() => {
    if (!response) return;
    const { nextPageToken, etag } = response;

    if (etag === lastResponseId) return;
    
    setLastResponseId(etag);

    const newChannels = differenceWith(
      mapToVideoChannels(response),
      videoChannels,
      isEqual
    );

    if (newChannels.length) {
      setVideoChannels([...videoChannels, ...newChannels]);
    }

    if (nextPageToken !== pageId) {
      setPageId(nextPageToken || "none");
    }

    containerElementChanged();
  }, [
    response,
    videoChannels,
    pageId,
    containerElementChanged,
    lastResponseId,
  ]);

  return (
    <VideoChannelsWrapper
      isLoading={isLoading}
      searchPhrase={searchPhrase}
      isNoMoreResults={pageId === "none"}
      error={error}
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
