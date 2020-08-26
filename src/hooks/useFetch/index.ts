import { useEffect, useState } from "react";
import type {
  FetchHookResponseType as FetchHookResponse,
  ApiResponseType as ApiResponse,
} from "./api-response.type";
import { fetchMockBasedOnUrl } from "utils/mocks";
import { USE_MOCK_API } from "utils/constants";

export type FetchHookResponseType<T> = FetchHookResponse<T>;
export type ApiResponseType<T> = ApiResponse<T>;

export default useFetch;

function useFetch<T>({
  initialUrl,
}: {
  initialUrl: string;
}): FetchHookResponseType<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(initialUrl);

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      const responsePromise = USE_MOCK_API
        ? fetchMockBasedOnUrl(url)
        : fetch(url);

      responsePromise
        .then((res) => res.json())
        .then((res) => {
          if ("error" in res) {
            throw new Error(
              JSON.stringify({ message: "server error", error: res.error })
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
    }
  }, [url]);

  useEffect(() => {
    if (initialUrl && url !== initialUrl) setUrl(initialUrl);
  }, [url, initialUrl]);

  return [
    {
      isLoading,
      response,
      error,
    },
    setUrl,
  ];
}
