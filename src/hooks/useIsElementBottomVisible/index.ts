import { useEffect, useState, useCallback, RefObject } from "react";
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

function useIsElementBottomVisible(elementRef: RefObject<HTMLElement>): {
  isVisible: boolean,
  elementChanged: () => void
} {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { current: element } = elementRef;
  const elHeight = element ? element.offsetHeight : 0;
  const [elementHeight, setElementHeight] = useState<number>(elHeight);

  const triggerCheckIsVisible = useCallback<(element: HTMLElement)=> void>((element) => {
     const visible = isElementBottomInViewPort(element);
    if (isVisible !== visible) {
      setIsVisible(visible);
    }
   }, [isVisible, setIsVisible])

  useEffect(() => {
    const handleWindowChange = getCheckIsBottomVisible(element, (visible) => {
      if (isVisible !== visible) {
        setIsVisible(visible);
      }
    });
    window.addEventListener("scroll", handleWindowChange);
    window.addEventListener("resize", handleWindowChange);
    return () => {
      window.removeEventListener("scroll", handleWindowChange);
      window.removeEventListener("resize", handleWindowChange);
    };
  }, [element, setIsVisible, isVisible]);

  useEffect(() => {
    const checkHeightInterval = setInterval(() => {
      if (element && elementHeight !== element.offsetHeight) {
        setElementHeight(element.offsetHeight);
        triggerCheckIsVisible(element);
      }
    }, 100);

    return () => clearInterval(checkHeightInterval);
  }, [elementHeight, element, triggerCheckIsVisible]);

  return {
    isVisible,
    elementChanged: () => {
      setIsVisible(false);
    },
  };
}

export default useIsElementBottomVisible;
