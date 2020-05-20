import React, { Context, ReactNode, useState } from 'react';

type SearchVideoChannelState = {
  phrase: string;
};

type SearchVideoChannelContext = SearchVideoChannelState & {
  setPhrase: (phrase: string) => void;
};

const defaultValue: SearchVideoChannelContext = {
  phrase: '',
  setPhrase: () => {}
};

export const SearchVideoChannelContext: Context<SearchVideoChannelContext>
  = React.createContext(defaultValue);

export const SearchVideoChannelContextProvider
  = ({ children }: {children: ReactNode}) => {
    const [state, setState]
      = useState<SearchVideoChannelState>({ phrase: '' });

    const setPhrase: (phrase: string) => void = (phrase: string) => {
      setState({
        ...state,
        phrase
      });
    };

    return (
      <SearchVideoChannelContext.Provider value={{ ...state, setPhrase }}>
        {children}
      </SearchVideoChannelContext.Provider>
    );
  };
