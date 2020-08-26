import React, { ReactElement  } from "react";
import { MdSearch } from "react-icons/md";
import { Input } from "@rebass/forms";
import { SearchVideoChannelContext } from "providers/search-channel.provider";
import { Bar, SearchIconStyles } from "./styled";
import { withOnChange } from "./helpers";

export default SearchBarWithConsumer;

type Props = {
  phrase: string;
  setPhrase: (phrase: string) => void;
};

export function Search({ phrase, setPhrase }: Props): ReactElement {
  return (
    <Bar>
      <MdSearch style={SearchIconStyles} />
      <Input
        id="searchVideo"
        name="searchVideo"
        type="text"
        placeholder="start typing to search"
        value={phrase}
        onChange={withOnChange(setPhrase)}
        autoFocus
      />
    </Bar>
  );
}

function SearchBarWithConsumer(): ReactElement {
  return (
    <SearchVideoChannelContext.Consumer>
      {({ phrase, setPhrase }) => {
        return <Search phrase={phrase} setPhrase={setPhrase} />;
      }}
    </SearchVideoChannelContext.Consumer>
  );
}
