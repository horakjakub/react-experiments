import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export default useDebounce;

function useDebounce(
  phrase: string | null
): { debouncedPhrase: string | null } {
  const [debouncedPhrase, setDebouncedPhrase] = useState<string | null>(null);

  useEffect(
    debounce(() => {
      setDebouncedPhrase(phrase);
    }, 300)
  );

  return { debouncedPhrase };
}
