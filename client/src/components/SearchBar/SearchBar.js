import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/users';

function SearchBar(props) {
  const [input, setInput] = useState('');
  const [allUsers, setAllUsers] = useState(null);
  const { setSearchResults } = props;
  // const { allUsers } = props;

  useEffect(() => {
    async function getSearchResultsWrapper() {
      const data = await getAllUsers();
      setAllUsers(data);
      return data;
    }
    getSearchResultsWrapper();
  }, [input]);

  const filterData = (val) => {
    if (val === '') {
      return null;
    }
    // console.log(allUsers);
    // console.log(allUsers?.map((user) => user.username));
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
