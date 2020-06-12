import styled from 'styled-components';

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
  width: 64em;
  background: white;
  -webkit-box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'description photo'
    'description photo';
`;

export const Img = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 50%;
`;

export const VideosBox = styled.div`
  grid-area: photo;
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
`;

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid pink;
  width: 70%;
`;

export const VideosPlaceholder = styled.div`
  grid-area: photo;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32em;
  height: 48em;
`;
