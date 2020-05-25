import {useEffect, useState, RefObject} from 'react';
import isElementBottomInViewPort from 'utils/isElementBottomVisibileInViewport';

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

  useEffect(() => {
    const element = elementRef.current;
    const handleWindowChange = getCheckIsBottomVisible(element, isVis => {
      setIsVisible(isVis);
    });
    window.addEventListener('scroll', handleWindowChange);
    window.addEventListener('resize', handleWindowChange);
    return () => {
      window.removeEventListener('scroll', handleWindowChange);
      window.removeEventListener('resize', handleWindowChange);
    };
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef.current;
    setIsVisible(isElementBottomInViewPort(element));
  });

  return {isVisible};
}

export default useIsElementBottomVisible;
