import React, {ReactElement} from 'react';
import {Video as VideoType} from 'hooks/useVideos/useVideos';
import styled from 'styled-components';

export default Video;

const Wrapper = styled.a`
  position: relative;
  cursor: pointer;
`;

const Background = styled.div`
  background-image: ${(props: {imageUrl: string}) =>
    `url(${props.imageUrl})` || ''};
  background-size: cover;
  width: 16em;
  height: 16em;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  > h3 {
    color: white;
    font-family: Lato;
    display: none;
    opacity: 0;
  }
  > p {
    color: pink;
    font-family: Lato;
    font-weight: bold;
    font-size: 1.2em;
    text-align: right;
    align-self: flex-end;
    text-transform: lowercase;
  }
  :hover {
    background: rgba(0, 0, 0, 0.2);
    > h3 {
      opacity: 1;
      display: block;
    }
  }
`;

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
