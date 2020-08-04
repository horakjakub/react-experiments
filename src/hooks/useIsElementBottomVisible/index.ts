import {useEffect, useState, RefObject} from 'react';
import isElementBottomInViewPort from 'utils/element-bottom-visible.helpers';

function getCheckIsBottomVisible(
  el: HTMLElement | null,
  setIsVisible: (should: boolean) => void,
) {
  return function () {
    console.log(
      'isVisible checked from handler: ' + isElementBottomInViewPort(el),
    );
    if (isElementBottomInViewPort(el)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
}

function useIsElementBottomVisible(elementRef: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isElementChanged, setIsElementChanged] = useState<boolean>(false);
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
    if (isElementChanged) {
    
    console.log(
      'isVisible checked from useEffect: ' + isElementBottomInViewPort(element),
    );
      setIsVisible(isElementBottomInViewPort(element));
      setIsElementChanged(false);
    }
  }, [setIsVisible, element, isElementChanged, setIsElementChanged]);

  return {isVisible, setIsElementChanged};
}

export default useIsElementBottomVisible;
