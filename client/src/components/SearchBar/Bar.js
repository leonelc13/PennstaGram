import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { getAllUsers } from '../../api/users';
import './Bar.css';

function Bar(props) {
  const [searchResults, setSearchResults] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const { currentUser } = props;

  useEffect(() => {
    async function getSearchResultsWrapper() {
      const data = await getAllUsers();
      setAllUsers(data);
      return data;
    }
    getSearchResultsWrapper();
  }, []);

  if (allUsers !== null) {
    return (
      <div className="searchBar">
        <SearchBar setSearchResults={setSearchResults} allUsers={allUsers} />
        <SearchResults results={searchResults} currentUser={currentUser} />
      </div>

    );
  }
}

export default Bar;
