// ASSETS

// STYLES

// LIBRARIES
import { useEffect } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";
import { useLocation } from "react-router-dom";

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/products/`);

  // LIBRARY CONSTANTS
  const location = useLocation();
  const category = location.search;
  // const category = window.location.search;

  // const urlParams = new URLSearchParams(window.location.search);
  // const category = urlParams.get("phones");

  // STATE CONSTANTS
  // console.log(window.location.search);
  // console.log(urlParams);
  // console.log(category);

  // LIFE CYCLE

  // const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

  // if (currentPage === "add-product") {
  //   setIsLoading(false);
  //   return;
  // }

  // console.log(category);

  const handleTest = () => {
    if (category === "?category=phones") {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  useEffect(() => {
    if (category === "?category=phones") {
      console.log("true");
    } else {
      console.log("false");
    }
  }, [category]);

  // EVENT HANDLERS
  return (
    <div className="categories-container">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading data...</h2>}

      {!isLoading && !error && (
        <div>
          <div>
            Test
            <button onClick={handleTest}>test</button>
          </div>

          {/* {products?.map((product, index) => (
            <div key={`all-categories-${index}-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default Categories;
