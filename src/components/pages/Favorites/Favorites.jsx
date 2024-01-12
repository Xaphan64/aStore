// ASSETS

// STYLES
import "./Favorites.scss";
// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import { Fragment } from "react";
import FavoriteFilter from "./FavoriteFilter";

// CONFIGURATION
const Favorites = () => {
  // PROPERTIES

  // API REQUESTS
  const { isLoading, error } = useFetch(`http://localhost:8000`);
  // LIBRARY CONSTANTS

  const products = [
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

  // EVENT HANDLERS
  return (
    <div className="favorite-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <Fragment>
          <h2 className="favorite-title">My favorites</h2>

          <div className="favorite-category">
            {products?.map((product, index) => (
              <FavoriteFilter type={product.type} key={`category-${index}-${product?.id}`} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Favorites;
