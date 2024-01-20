// ASSETS

// STYLES
import "./Favorites.scss";

// LIBRARIES
import { Fragment, useRef } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteFilter from "./FavoriteFilter";
import Snackbar from "../../atoms/Snackbar/Snackbar";

// CONFIGURATION
const Favorites = () => {
  // PROPERTIES

  // API REQUESTS
  const { isLoading, error } = useFetch(`http://localhost:8000`);

  // LIBRARY CONSTANTS
  const category = [
    { type: "phones" },
    { type: "laptops" },
    { type: "tv" },
    { type: "gaming" },
    { type: "books" },
    { type: "food" },
    { type: "toys" },
    { type: "furniture" },
  ];

  const snackbarRefCart = useRef(null);
  const snackbarType = {
    addCart: "addCart",
  };
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const showaddCart = () => {
    snackbarRefCart.current.show();
  };

  return (
    <div className="favorite-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading favorites...</h2>}

      <Snackbar message="Product added to cart" ref={snackbarRefCart} type={snackbarType.addCart} />

      {!isLoading && !error && (
        <Fragment>
          <h2 className="favorite-title">My favorites</h2>

          <div className="favorite-category">
            {category?.map((product, index) => (
              <FavoriteFilter type={product.type} key={`category-${index}-${product?.id}`} showaddCart={showaddCart} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Favorites;
