import { Dispatch, SetStateAction } from "react";

export type ApiResponseType<T> = {
  response: T | null;
  isLoading: boolean;
  error: Error | null;
};

export type FetchHookResponseType<T> = [
  ApiResponseType<T>,
  Dispatch<SetStateAction<string | null>>
];
