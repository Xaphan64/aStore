// ASSETS

// STYLES
import "./Favorites.scss";
// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteCard from "../../cards/FavoriteCard";
import { Fragment } from "react";

// CONFIGURATION
const Favorites = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: phones, isLoading, error } = useFetch(`http://localhost:8000/phones`);

  // LIBRARY CONSTANTS
  const phonesFavorite = phones.filter((product) => product.favorite === true);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="favorite-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <Fragment>
          {phones.length > 0 && (
            <Fragment>
              <h2 className="favorite-title">My favorites</h2>

              <div className="favorite-category">
                {phonesFavorite.map((product, index) => (
                  <div className="favorite-map" key={`phones-${index}-${product?.id}`}>
                    <FavoriteCard product={product} />
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Favorites;
