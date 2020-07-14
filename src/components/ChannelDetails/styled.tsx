import styled from 'styled-components';
import {device} from 'global-styles/breakpoints-devices';

export const Blanket = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  font-family: Lato;
  font-size: 2em;
  position: absolute;
  top: 1em;
  right: 1em;
  border: 0;
  color: white;
  font-weight: bold;
`;

export const Modal = styled.div`
  width: 100vw;
  background: white;
  box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  display: grid;
  height: 48em;
  max-width: 64em;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'description photo'
    'description photo';
  @media ${device.tablet} {
    grid-template-rows: auto 16em;
    height: initial;
    max-width: 48em;
    grid-template-areas:
      'description description'
      'photo photo';
  }
`;

export const Img = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 50%;
`;

export const VideosBox = styled.div`
  grid-area: photo;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background: #eee;
  @media ${device.tablet} {
    width: 100vw;
    max-width: 48em;
    width: 100vw;
    > a:nth-child(3),
    > a:nth-child(4),
    > a:nth-child(5) {
      display: none;
    }
    flex-wrap: nowrap;
  }
`;

export const Header = styled.header`
  padding: 2em 2em 1em;
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 1em;
  font-family: Lato;
  font-size: 1.6em;
`;

export const Description = styled.p`
  font-family: Lato;
  font-size: 1.4em;
  padding: 1em 2em;
  color: #555;
`;

export const Content = styled.section`
  grid-area: description;
  overflow-y: auto;
  padding: 0 0 1em;
`;

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid pink;
  width: 70%;
`;

export const VideosPlaceholder = styled.div`
  grid-area: photo;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
