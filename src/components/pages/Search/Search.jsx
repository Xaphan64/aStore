// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";

// MISC
import { getPosts } from "../../axios/axios";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";

// COMPONENTS

// CONFIGURATION
const Search = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // LIFE CYCLE
  useEffect(() => {
    getPosts()
      .then((json) => {
        setPosts(json);
        return json;
      })
      .then((json) => {
        setSearchResults(json);
      });
  }, []);

  // EVENT HANDLERS
  return (
    <div className="search-container">
      <h1>Search page</h1>

      <SearchBar posts={posts} setSearchResults={setSearchResults} />

      <ListPage searchResults={searchResults} />
    </div>
  );
};

export default Search;
