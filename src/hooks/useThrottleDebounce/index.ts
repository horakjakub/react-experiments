import { useState, useEffect } from 'react';
import { throttle, debounce } from 'lodash';

export default useThrottleDebounce;

function useThrottleDebounce(phrase: string | null): { throttledDebouncedPhrase: string | null } {
  const [throttledDebouncedPhrase, setThrottledDebouncedPhrase] = useState<string | null>(null);

  const setThrottled = throttle(txt => {
    setThrottledDebouncedPhrase(txt);
  }, 300);

  const setDebounced = debounce(txt => {
    setThrottledDebouncedPhrase(txt);
  }, 300);

  useEffect(() => {
    if (phrase) {
      phrase.length < 5 ? setDebounced(phrase) : setThrottled(phrase);
    }
  }, [phrase, setDebounced, setThrottled]);

  return { throttledDebouncedPhrase };
}
