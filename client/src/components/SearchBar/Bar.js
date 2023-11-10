import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './Bar.css';

function Bar(props) {
  const [searchResults, setSearchResults] = useState(null);
  const { currentUser } = props;

  return (
    <div className="searchBar">
      <SearchBar setSearchResults={setSearchResults} />
      <SearchResults results={searchResults} currentUser={currentUser} />
    </div>

  );
}

export default Bar;
