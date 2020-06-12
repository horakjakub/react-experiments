import {videosData} from 'utils/videos.mock';
import {Video} from 'hooks/useVideos/useVideos';

// eslint-disable-next-line
export const VideosMock: Video[] = videosData.map((v: any, idx: number) => ({
  ...v,
  id: `${idx}`,
}));
