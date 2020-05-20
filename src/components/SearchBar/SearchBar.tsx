import React, { FunctionComponent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Input } from '@rebass/forms';
import { SearchVideoChannelContext } from '../../services/SearchChannelProvider/SearchChannelProvider';
import useVideoChannels from '../../hooks/useVideoChannels/useVideoChannels';

const Bar: FunctionComponent = styled.div`
  width: 100%;
  height: 20%;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const withOnChange: (func: (state: string) => void) => (e: ChangeEvent<HTMLInputElement>) => void
  = (func) => (e) => {func(e.target.value);};

const SearchBarWithConsumer = ({ setSearchPhrase }: { setSearchPhrase: Dispatch<SetStateAction<string>>}) => {
  return (
    <Bar>
      <SearchVideoChannelContext.Consumer>
        {({ phrase, setPhrase }) => {
          return (
            <Input
              id='searchVideo'
              name='searchVideo'
              type='text'
              placeholder='type channel name to start search'
              value={phrase}
              onChange={(e)=> { setSearchPhrase(e.target.value); setPhrase(e.target.value); }}
            />
          );
        }}
      </SearchVideoChannelContext.Consumer>
    </Bar>
  );
};

export default SearchBarWithConsumer;
