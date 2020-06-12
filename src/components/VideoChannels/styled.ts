import styled from 'styled-components';

export const VideoChannelsBox = styled.div``;

export const VideoChannelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36em, 1fr));
  gap: 2em;
  margin: 1em;
`;

export const ResultsPlaceholder = styled.div`
  width: 36em;
  height: 44em;
  margin: 1.5em 1em 1em 1em;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2.4em;
    font-family: 'Lato', sans-serif;
    color: pink;
    padding: 1em;
    text-align: center;
  }
`;
