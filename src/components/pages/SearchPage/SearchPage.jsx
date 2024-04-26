// ASSETS

// STYLES
import "./SearchPage.scss";

// LIBRARIES
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

// MISC
import { useLocation } from "react-router-dom";

// COMPONENTS
import SearchCard from "../../cards/SearchCard";

// CONFIGURATION
const SearchPage = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { state } = useLocation();

  const categories = [
    { type: "phones" },
    { type: "laptops" },
    { type: "tv" },
    { type: "gaming" },
    { type: "books" },
    { type: "food" },
    { type: "toys" },
    { type: "furniture" },
  ];

  // STATE CONSTANTS
  const [productsList, setProductList] = useState([]);
  const searchFilter = productsList?.filter((value) => value.name.toLowerCase().includes(state.search.toLowerCase()));

  // LIFE CYCLE
  useEffect(() => {
    categories.forEach((category) => {
      axios.get(`https://blog-data-9hab.onrender.com/${category.type}`).then((response) => {
        setProductList((prev) => [...prev, ...response.data]);
      });
    });
    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  return (
    <div className="search-container">
      {searchFilter.length === 0 ? (
        <div className="search-zero-results">
          <h2>The product that you are searching for does not exist.</h2>
          <h2>Please search for another product.</h2>
        </div>
      ) : (
        <Fragment>
          <h2>Search results:</h2>
          {searchFilter.map((filteredProduct, index) => (
            <div className="search-results" key={index}>
              <SearchCard product={filteredProduct} type={filteredProduct.type} />
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default SearchPage;
