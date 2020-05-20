import {getYTApiUrl} from 'utils/constants';

export function getYTApiSearchUrl(
  phrase: string,
  resultsNo: number,
) {
  return `${getYTApiUrl(
    'search',
  )}&part=snippet&type=channel&q=${phrase}&maxResults=${resultsNo}`;
}

export function getYTApiChannelUrl(id: string) {
  return `${getYTApiUrl(
    'channels',
  )}&part=contentDetails&id=${id}&maxResults=1`;
}

export function getYTApiPlaylistItemsUrl(id: string, resultsNo: number) {
  return `${getYTApiUrl(
    'playlistItems',
  )}&part=contentDetails&playlistId=${id}&maxResults=${resultsNo}`;
}

export function getYTApiVideosUrl(...ids: string[]) { 
  return `${getYTApiUrl(
    'videos',
  )}&part=snippet&id=${ids.join(',')}`;
}
