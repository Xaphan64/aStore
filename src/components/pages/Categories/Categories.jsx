// ASSETS

// STYLES
import "./Categories.scss";

// LIBRARIES
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  const location = useLocation();
  const category = location.pathname.split("/")[location.pathname.split("/").length - 1];

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/${category}`);

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    console.log(category);
  }, [category]);

  // EVENT HANDLERS

  return (
    <div className="categories-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <Fragment>
          {products.length > 0 ? (
            <div className="categories-map">
              <h2 className="category-title">{category}</h2>
              <div className="category-card">
                {products?.map((product, index) => (
                  <Fragment key={`categories-${index}-${product.id}`}>
                    <ProductCard product={product} category={category} />
                  </Fragment>
                ))}
              </div>
            </div>
          ) : (
            <h2 className="error-message">Currently, there are not products available in this category.</h2>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Categories;
