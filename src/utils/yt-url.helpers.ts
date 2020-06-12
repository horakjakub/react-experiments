import {YT_API_URL, API_KEY} from 'utils/constants';

function getYTApiUrl(
  apiContent: 'search' | 'channels' | 'playlistItems' | 'videos',
) {
  return `${YT_API_URL}${apiContent}?key=${API_KEY}`;
}

export function getYTApiSearchUrl(
  phrase: string,
  resultsNo: number,
  pageToken?: string,
) {
  return `${getYTApiUrl(
    'search',
  )}&part=snippet&type=channel&q=${phrase}&maxResults=${resultsNo}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }`;
}

export function getYTApiChannelUrl(id: string) {
  return `${getYTApiUrl('channels')}&part=contentDetails&id=${id}&maxResults=1`;
}

export function getYTApiPlaylistItemsUrl(id: string, resultsNo: number) {
  return `${getYTApiUrl(
    'playlistItems',
  )}&part=contentDetails&playlistId=${id}&maxResults=${resultsNo}`;
}

export function getYTApiVideosUrl(...ids: string[]) {
  return `${getYTApiUrl('videos')}&part=snippet&id=${ids.join(',')}`;
}
