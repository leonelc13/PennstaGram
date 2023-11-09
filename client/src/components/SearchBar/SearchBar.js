import React, { useState } from 'react';

function SearchBar(props) {
  const [input, setInput] = useState('');
  const { setSearchResults } = props;
  const { allUsers } = props;

  const filterData = (val) => {
    if (val === '') {
      return null;
    }
    const filteredData = allUsers?.filter((user) => user.username.startsWith(val));
    return filteredData;
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
    const data = filterData(e.target.value);
    setSearchResults(data);
  };

  return (
    <input type="text" id="search-input" placeholder="Search for Users" value={input} onChange={handleOnChange} />
  );
}

export default SearchBar;
