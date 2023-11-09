import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults(props) {
  const { results } = props;
  const { currentUser } = props;
  return (
    <div className="result-list">
      {results
            && results.map((result) => (
              <div className="result-preview" key={result.username}>
                <Link to={`/user/${result.username}`} currentUsername={currentUser}>
                  <p>{result.username}</p>
                </Link>
              </div>
            ))}
    </div>
  );
}

export default SearchResults;
