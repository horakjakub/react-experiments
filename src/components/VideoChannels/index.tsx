import React, { ReactElement, useState, RefObject, useEffect } from "react";
import { differenceWith, isEqual } from "lodash";
import VideoChannelWithModal from "components/VideoChannel";
import VideoChannelsWrapper from "components/VideoChannelsWrapper";
import useVideoChannels, { mapToVideoChannels } from "hooks/useVideoChannels";
import { VideoChannelType } from "common-types/video-channel.type";
import useDebounce from "hooks/useDebounce";
import useIsElementBottomVisible from "hooks/useIsElementBottomVisible";

export default VideoChannels;

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
    elementChanged: containerElementChanged,
  } = useIsElementBottomVisible(wrapperRef);
  const [requestedPages, setRequestedPages] = useState<string[]>([]);
  const { throttledDebouncedPhrase } = useDebounce(searchPhrase);
  const [lastSearchPhrase, setLastSearchPhrase] = useState<string | null>(null);
  const [lastResponseId, setLastResponseId] = useState<string>();
  const [{ response, isLoading, error }, doFetch] = useVideoChannels();

  useEffect(() => {
    const isPageAlreadyRequested = requestedPages.includes(pageId)
      ? true
      : false;

    const phraseChanged = lastSearchPhrase !== throttledDebouncedPhrase;

    const shouldSearch =
      pageId !== "none" &&
      !isLoading &&
      !error &&
      !isPageAlreadyRequested &&
      !!throttledDebouncedPhrase &&
      (phraseChanged || (!!videoChannels.length && isBottomBorderVisible));

    if (phraseChanged) {
      window.scrollTo(0, 0);
      setLastSearchPhrase(throttledDebouncedPhrase);
      setVideoChannels([]);
      setRequestedPages([]);
      setPageId(FIRST_PAGE_ID);
    }

    if (phraseChanged && shouldSearch) {
      setRequestedPages([...requestedPages, pageId]);
    }

    if (shouldSearch) {
      doFetch(
        throttledDebouncedPhrase || "",
        20,
        pageId === FIRST_PAGE_ID || phraseChanged ? null : pageId
      );
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
    if (!response || response.etag === lastResponseId) return;
    setLastResponseId(response.etag);

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
