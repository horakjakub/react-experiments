import styled from "styled-components";
import { device } from "global-styles/breakpoints-devices";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "description photo"
    "description photo";
  @media ${device.tablet} {
    grid-template-rows: auto 16em;
    height: initial;
    max-width: 48em;
    grid-template-areas:
      "description description"
      "photo photo";
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
