import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
        transform: rotate(0deg);
      }

  to {
        transform: rotate(360deg);
      }
`;

const Spinner = styled.div`
      margin: 1em;
      display:inline-block;
      width: 2em;
      height: 2em;
      border-radius:50%;
      border:4px solid silver;
      animation: ${rotate} .7s linear infinite; 
      border:3px solid grey;
      position:relative;
      &:after {
            position:absolute;
            content:"";
            width: 80%;
            height: 80%;
            background: transparent;
            top: 50%;
            left: 50%;
            margin-left:-40%;
            margin-top:-40%;
            border-radius:50%;
            border:2px solid grey;
            box-sizing:border-box;
            border-bottom-color:transparent;
            border-left-color:transparent;
          }
`;

export default Spinner;
