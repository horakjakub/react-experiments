import {useEffect, useState} from 'react';
import type {ApiResponseType as ApiResponse} from './api-response.type';

export default useFetch;

export type ApiResponseType<T> = ApiResponse<T>;

function useFetch<T>({url}: {url: string | null}): ApiResponse<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if ('error' in res) {
            throw new Error(
              JSON.stringify({message: 'server error', error: res.error}),
            );
          }
          setResponse(res);
        })
        .catch((e: Error) => {
          setError(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setResponse(null);
      setIsLoading(false);
      setError(null);
    }
  }, [url]);

  return {
    isLoading,
    response,
    error,
  };
}
