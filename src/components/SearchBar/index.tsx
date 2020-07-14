import React, {
  ReactElement,
  ChangeEvent,
  useRef,
  useEffect,
  RefObject,
} from 'react';
import {MdSearch} from 'react-icons/md';
import {Input} from '@rebass/forms';
import {SearchVideoChannelContext} from 'providers/search-channel.provider';
import {Bar} from './styled';

export default SearchBarWithConsumer;

type Props = {
  phrase: string;
  setPhrase: (phrase: string) => void;
};

export function Search({phrase, setPhrase}: Props): ReactElement {
  const searchEl: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (searchEl && searchEl.current) {
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
        onChange={withOnChange(setPhrase)}
        ref={searchEl}
      />
    </Bar>
  );
}

function withOnChange(
  func: (state: string) => void,
): (e: ChangeEvent<HTMLInputElement>) => void {
  return e => {
    func(e.target.value);
  };
}

function SearchBarWithConsumer(): ReactElement {
  return (
    <SearchVideoChannelContext.Consumer>
      {({phrase, setPhrase}) => {
        return <Search phrase={phrase} setPhrase={setPhrase} />;
      }}
    </SearchVideoChannelContext.Consumer>
  );
}
