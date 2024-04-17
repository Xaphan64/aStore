const SearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (event) => {
    if (!event.target.value) return setSearchResults(posts);

    const resultsArray =
      posts.filter((post) => post.title.includes(event.target.value)) || posts.body.includes(event.target.value);

    setSearchResults(resultsArray);
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type="text" id="search" onChange={handleSearchChange} />

        <button>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
