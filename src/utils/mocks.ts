import {videosMockData} from 'utils/videos.mock-data';
import Video from 'common-types/video.type';

export const VideosMock = videosMockData.map((v, idx: number) => ({
  ...v,
  id: `${idx}`,
})) as Video[];
