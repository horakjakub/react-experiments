import styled from 'styled-components';

export const VideoChannelWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const VideoChannelBox = styled.div`
  display: inline-flex;
  min-width: 36em;
  max-width: 36em;
  height: 44em;
  background: white;
  flex-direction: column;
  position: relative;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  top: 0.5em;
  :hover {
    top: 0;
    -webkit-box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
    -moz-box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
    box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  }
`;

export const Description = styled.section`
  padding: 1.5em 1.5em;
  border: 0 1px 1px 1px solid #eee;
  width: 36em;
  background: white;
  h3 {
    font-size: 1.8em;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
  }

  p {
    font-size: 1.6em;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Figure = styled.figure`
  margin: 0;
`;

export const Img = styled.img`
  width: 36em;
  height: 36em;
`;
