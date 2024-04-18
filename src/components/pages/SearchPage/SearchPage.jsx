// ASSETS

// STYLES

// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import SearchBar from "./SearchBar";
import SearchPageCategories from "./SearchPageCategory";

// CONFIGURATION
const SearchPage = () => {
  // PROPERTIES

  const { data: productData } = useFetch(`http://localhost:8000/phones`);
  // API REQUESTS

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

  // STATE CONSTANTS

  // LIFE CYCLE

  //   console.log(data);

  // EVENT HANDLERS
  return (
    <div>
      <h1>search page</h1>

      <SearchBar placeholder="Type here to search for products..." data={productData} />

      {/* {categories?.map((product, index) => (
        <SearchPageCategories type={product.type} key={`category-${index}-${product?.id}`} />
      ))} */}
    </div>
  );
};

export default SearchPage;
