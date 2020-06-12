import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
import {MdSearch} from 'react-icons/md';
import {Input} from '@rebass/forms';
import {Bar} from './styled';
import {SearchVideoChannelContext} from 'providers/search-channel.provider';

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
