import styled from 'styled-components';

export const Wrapper = styled.a`
  position: relative;
  cursor: pointer;
  display: flex;
  max-width: 16em;
  max-height: 16em;
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  background-image: ${(props: {imageUrl: string}) =>
    `url(${props.imageUrl})` || ''};
  background-size: cover;
  max-width: 16em;
  max-height: 16em;
  height: 100%;
  width: 100%;
`;

export const BackgroundOverlay = styled.div`
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
    > p {
      display: none;
    }
  }
`;

