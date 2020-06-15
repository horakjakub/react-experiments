import {useState, useEffect} from 'react';
import {debounce} from 'lodash';

export default useDebounce;

function useDebounce(phrase: string | null): {debouncedPhrase: string | null} {
  const [debouncedPhrase, setDebouncedPhrase] = useState<string | null>(null);

  const setDebounced = debounce(txt => setDebouncedPhrase(txt), 300);

  useEffect(() => {
    setDebounced(phrase);
  }, [phrase, setDebounced]);

  return {debouncedPhrase};
}
