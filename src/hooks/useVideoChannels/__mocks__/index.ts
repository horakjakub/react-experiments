const useVideoChannelsMock = jest.fn(); 

useVideoChannelsMock.mockReturnValue({ response: { nextPageToken: 'cat' }, isLoading: true });

export const mapToVideoChannels = jest.fn();

export default useVideoChannelsMock; 

