import {useEffect, useState, RefObject} from 'react';
import isElementBottomInViewPort from 'utils/element-bottom-visible.helpers';

function getCheckIsBottomVisible(
  el: HTMLElement | null,
  setIsVisible: (should: boolean) => void,
) {
  return function () {
    if (isElementBottomInViewPort(el)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
}

function useIsElementBottomVisible(elementRef: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const element = elementRef.current;

  useEffect(() => {
    const handleWindowChange = getCheckIsBottomVisible(element, isVis => {
      setIsVisible(isVis);
    });
    window.addEventListener('scroll', handleWindowChange);
    window.addEventListener('resize', handleWindowChange);
    return () => {
      window.removeEventListener('scroll', handleWindowChange);
      window.removeEventListener('resize', handleWindowChange);
    };
  }, [element]);

  useEffect(() => {
    setIsVisible(isElementBottomInViewPort(element));
  }, [setIsVisible, element]);

  return {isVisible};
}

export default useIsElementBottomVisible;
