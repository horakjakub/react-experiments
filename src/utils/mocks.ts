import {videosMockData} from 'utils/videos.mock-data';
import { VideoType } from 'common-types/video.type';
import { VideoChannelType } from 'common-types/video-channel.type';
import videoChannelsData from 'utils/video-channels.mock-data';

export const videoChannelsMock: VideoChannelType[] = videoChannelsData;

export const videosMock: VideoType[] = videosMockData.map((v, idx: number) => ({
  ...v,
  id: `${idx}`,
})) as VideoType[];
