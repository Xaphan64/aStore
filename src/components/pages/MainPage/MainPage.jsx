// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";

// CONFIGURATION
const MainPage = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch("http://localhost:8000/products");

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="main-page-container">
      <h1>Three carousel ads will be here with timer to change the ad</h1>

      {error && <h2>{error}</h2>}

      {isLoading && <h2>Loading data...</h2>}

      {products?.map((product, index) => (
        <Fragment key={`${index}-${product?.id}`}>
          <ProductCard product={product} />
        </Fragment>
      ))}
    </div>
  );
};

export default MainPage;
