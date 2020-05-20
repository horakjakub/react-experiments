// eslint-disable-next-line
export const API_KEY = process.env.REACT_APP_API_KEY;
export const YT_API_URL = 'https://www.googleapis.com/youtube/v3/';

export function getYTApiUrl(
  apiContent: 'search' | 'channels' | 'playlistItems' | 'videos',
) {
  return `${YT_API_URL}${apiContent}?key=${API_KEY}`;
}
