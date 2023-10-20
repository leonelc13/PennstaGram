/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/profile/${searchTerm.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
