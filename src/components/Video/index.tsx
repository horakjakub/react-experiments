import React, {ReactElement} from 'react';
import {Wrapper, Background, BackgroundOverlay} from './styled';

export default Video;

function Video({
  title,
  thumbnailUrl,
  tags,
  id,
}: {
  id: string;
  title: string;
  thumbnailUrl: string;
  tags: string[];
  description: string;
}): ReactElement {
  return (
    <Wrapper
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer">
      <BackgroundOverlay>
        <h3>{title}</h3>
        <p>{tags ? `#${tags.slice(0, 3).join(' #')}` : ''} </p>
      </BackgroundOverlay>
      <Background imageUrl={thumbnailUrl} />
    </Wrapper>
  );
} 