import { useEffect, useState, RefObject } from "react";
import { throttle } from "lodash";
import isElementBottomInViewPort from "./helpers";

function getCheckIsBottomVisible(
  el: HTMLElement | null,
  setIsVisible: (should: boolean) => void
) {
  return throttle(function () {
    if (isElementBottomInViewPort(el)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, 16);
}

function useIsElementBottomVisible(elementRef: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isElementChanged, setIsElementChanged] = useState<boolean>(false);
  const element = elementRef.current;

  useEffect(() => {
    const setIsVisibleIfChanged = function (visible: boolean) {
      setIsVisible(isVisible !== visible);
    };

    const handleWindowChange = getCheckIsBottomVisible(element, (isVis) => {
      setIsVisibleIfChanged(isVis);
    });
    window.addEventListener("scroll", handleWindowChange);
    window.addEventListener("resize", handleWindowChange);
    return () => {
      window.removeEventListener("scroll", handleWindowChange);
      window.removeEventListener("resize", handleWindowChange);
    };
  }, [element, setIsVisible, isVisible]);

  useEffect(() => {
    if (isElementChanged) {
      const setIsVisibleIfChanged = function (visible: boolean) {
        setIsVisible(isVisible !== visible);
      };

      setIsVisibleIfChanged(isElementBottomInViewPort(element));
      setIsElementChanged(false);
    }
  }, [setIsVisible, element, isElementChanged, setIsElementChanged, isVisible]);

  return { isVisible, setIsElementChanged };
}

export default useIsElementBottomVisible;
