import React, {
  FunctionComponent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {MdSearch} from 'react-icons/md';
import {Input} from '@rebass/forms';
import {SearchVideoChannelContext} from '../../services/SearchChannelProvider/SearchChannelProvider';

const Bar: FunctionComponent = styled.div`
  width: 100%;
  height: 20%;
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

export function SearchBar({phrase, setSearchPhrase, setPhrase}: any) {
  const searchEl: any = useRef(null);

  useEffect(() => {
    if (searchEl) {
      searchEl.current.focus();
    }
  }, [searchEl]);

  return (
    <Bar>
      <MdSearch style={{fontSize: '2em', margin: '0 .6em', color: '#999999'}} />
      <Input
        id="searchVideo"
        name="searchVideo"
        type="text"
        placeholder="start typing to search"
        value={phrase}
        onChange={e => {
          setSearchPhrase(e.target.value);
          setPhrase(e.target.value);
        }}
        ref={searchEl}
      />
    </Bar>
  );
}
const withOnChange: (
  func: (state: string) => void,
) => (e: ChangeEvent<HTMLInputElement>) => void = func => e => {
  func(e.target.value);
};

const SearchBarWithConsumer = ({
  setSearchPhrase,
}: {
  setSearchPhrase: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <SearchVideoChannelContext.Consumer>
      {({phrase, setPhrase}) => {
        return (
          <SearchBar
            phrase={phrase}
            setPhrase={setPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        );
      }}
    </SearchVideoChannelContext.Consumer>
  );
};

export default SearchBarWithConsumer;
