import styled from "styled-components";
import { device } from "global-styles/breakpoints-devices";

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

export const ModalContainer = styled.div`
  width: 100vw;
  background: white;
  box-shadow: -0.5em 1.3em 1.8em 0.3em rgba(0, 0, 0, 0.1);
  height: 48em;
  max-width: 64em;
    @media ${device.tablet} {
      grid-template-rows: auto 16em;
      height: initial;
      max-width: 48em;
`;
