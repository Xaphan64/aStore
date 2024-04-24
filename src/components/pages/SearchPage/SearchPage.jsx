// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";
import axios from "axios";

// MISC
import { useLocation } from "react-router-dom";

// COMPONENTS
import SearchCard from "../../cards/SearchCard";

// CONFIGURATION
const SearchPage = () => {
  // PROPERTIES

  // API REQUESTS

  const [productsList, setProductList] = useState([]);

  // LIBRARY CONSTANTS
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

  const { state } = useLocation();

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    categories.forEach((category) => {
      axios.get(`http://localhost:8000/${category.type}`).then((response) => {
        setProductList((prev) => [...prev, ...response.data]);
      });
    });
    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  return (
    <div>
      <h1>Search results:</h1>

      {productsList
        ?.filter((value) => value.name.toLowerCase().includes(state.search.toLowerCase()))
        .map((filteredProduct, index, type) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", paddingTop: 4, paddingBottom: 4 }}>
            <SearchCard product={filteredProduct} type={filteredProduct.type} />
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
