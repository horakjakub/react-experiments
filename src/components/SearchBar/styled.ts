import { FC } from 'react';
import styled from 'styled-components';

export const Bar: FC = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  height: 4em;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  input {
    font-size: 1.6em;
    font-family: 'Lato', sans-serif;
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: pink;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: pink;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: pink;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: pink;
    }
    border: 0;
    :focus {
      border: 0;
      outline: none;
    }
  }
`;
