import styled from "styled-components";

export const ImgErrorPlaceholder = styled.div`
  width: ${(props: { size: string }) =>
    props.size === "big" ? "36em" : "1em"};
  height: ${(props: { size: string }) =>
    props.size === "big" ? "36em" : "1em"};
  background: rgba(255, 192, 203, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2em;
  border-radius: ${(props: { size: string }) =>
    props.size === "big" ? "none" : "50%"};
  > p {
    color: white;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 1.8em;
    text-align: center;
    margin: 0.1em 0;
    display: ${(props: { size: string }) =>
      props.size === "big" ? "block" : "none"};
    &: first-of-type {
      font-size: ${(props: { size: string }) =>
        props.size === "big" ? "3.4em" : "1em"};
      display: block;
    }
  }
`;
