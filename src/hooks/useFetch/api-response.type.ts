export type ApiResponseType<T> = {
  response: T | null;
  isLoading: boolean;
  error: Error | null;
};
