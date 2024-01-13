// ASSETS

// STYLES
import "./../Favorites/Favorites.scss";

// LIBRARIES
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";
import CartFilter from "./CartFilter";

// COMPONENTS

// CONFIGURATION
const Cart = () => {
  // PROPERTIES

  // API REQUESTS
  const { isLoading, error } = useFetch("http://localhost:8000");

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
      {isLoading && <h2 className="error-message">Loading cart...</h2>}

      {!isLoading && !error && (
        <Fragment>
          <h1 className="favorite-title">My Cart</h1>

          <div className="favorite-category">
            {products?.map((product, index) => (
              <CartFilter type={product.type} key={`category-${index}-${product.id}`} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
