// ASSETS

import { useFetch } from "../../hooks/useFetch";
import SearchBar from "./SearchBar";

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const SearchPageCategories = ({ type = "" }) => {
  // PROPERTIES

  // API REQUESTS
  const { data: products } = useFetch(`http://localhost:8000/${type}`);
  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div>
      <SearchBar placeholder="Type here to search for products..." data={products} />
      {products?.map((product, index) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
};

export default SearchPageCategories;
