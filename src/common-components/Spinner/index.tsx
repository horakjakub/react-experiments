import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg);
      }

  to {
        transform: rotate(360deg);
      }
`;

type Props = {
  size?: string;
  color?: string;
};

export default styled.div`
  margin: 1em;
  display: inline-block;
  width: ${(props: Props) => props.size || '2em'};
  height: ${(props: Props) => props.size || '2em'};
  border-radius: 50%;
  border: 4px solid silver;
  animation: ${rotate} 0.7s linear infinite;
  border: 3px solid ${(props: Props) => props.color || 'grey'};
  position: relative;
  &:after {
    position: absolute;
    content: '';
    width: 80%;
    height: 80%;
    background: transparent;
    top: 50%;
    left: 50%;
    margin-left: -40%;
    margin-top: -40%;
    border-radius: 50%;
    border: 2px solid ${props => props.color || 'grey'};
    box-sizing: border-box;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
`;

