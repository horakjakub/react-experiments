const useIsElementBottomVisible = jest.fn();

useIsElementBottomVisible.mockReturnValue({
  isVisible: null,
  setIsElementChanged: jest.fn(),
});

export default useIsElementBottomVisible;
