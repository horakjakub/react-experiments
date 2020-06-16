const thumbnailUrl1 =
  'https://yt3.ggpht.com/-_p81gJCwoJA/AAAAAAAAAAI/AAAAAAAAAAA/1j_w8z5jhxs/s800-c-k-no-mo-rj-c0xffffff/photo.jpg';
const thumbnailUrl2 =
  'https://yt3.ggpht.com/-HMwHc6Xhc6A/AAAAAAAAAAI/AAAAAAAAAAA/91QtuNLyRz4/s800-c-k-no-mo-rj-c0xffffff/photo.jpg';
const thumbnailUrl3 =
  'https://yt3.ggpht.com/-eddbsyN7uAw/AAAAAAAAAAI/AAAAAAAAAAA/pLdaSejwsnk/s800-c-k-no-mo-rj-c0xffffff/photo.jpg';
const thumbnailUrl4 =
  'https://yt3.ggpht.com/-pCVFPJc8vX0/AAAAAAAAAAI/AAAAAAAAAAA/d7XQ8FOSt20/s800-c-k-no-mo-rj-c0xffffff/photo.jpg';

function getThumbnail(no: number) {
  switch (no) {
    case 1:
      return thumbnailUrl1;
    case 2:
      return thumbnailUrl2;
    case 3:
      return thumbnailUrl3;
    default:
      return thumbnailUrl4;
  }
}

let count = 0;

export function generateMockVideoChannelData(id: string) {
  if (count === 4) {
    count = 0;
  }
  count++;
  return {
    id: `cat ${id}`,
    title: `Cool title ${id}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nunc eget mass nunc. Nulla tellus massa, malesuada vulputate velit
      nec, mollis vulputate tellus. Integer pretium vulputate purus, et
      vulputate odio egestas non. Morbi ultrices lectus eu blandit euismod.
       Nunc eget massa nunc. Nulla tellus massa, malesuada vulputate velit
      nec, mollis vulputate tellus. Integer pretium vulputate purus, et
      vulputate odio egestas non. Morbi ultrices lectus eu blandit euismod.  Donec orci massa, feugiat nec maximus non, tristique at velit.
      Phasellus hendrerit odio ut lobortis faucibus. `,
    thumbnailUrl: getThumbnail(count),
  };
}

export default [ '1', '2', '3', '4', '5', '6'].map((id) => generateMockVideoChannelData(id));
