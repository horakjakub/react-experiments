import styled from "styled-components";

export const VideoChannelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36em, 1fr));
  gap: 2em;
  margin: 4em 1em 1em;
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
    font-family: "Lato", sans-serif;
    color: pink;
    padding: 1em;
    text-align: center;
  }
`;

export const ErrorContainer = styled.div`
  background: rgba(0, 0, 0, 0.15); 
   width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2em;
  color: white;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 1.8em;
  text-align: center;
  > h2 {
    margin: 0.4em 0;
  }

`;
