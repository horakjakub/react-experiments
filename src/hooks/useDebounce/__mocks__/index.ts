const useDebounce = jest.fn();

useDebounce.mockReturnValue({
  debouncedPhrase: '', 
  setDebouncedPhrase: jest.fn(),
});

export default useDebounce;
