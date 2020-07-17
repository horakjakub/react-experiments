const useVideoChannelsMock = jest.fn(); 

useVideoChannelsMock.mockReturnValue({ response: { nextPageId: 'cat' }, isLoading: true });

export const mapToVideoChannels = jest.fn();

export default useVideoChannelsMock; 

