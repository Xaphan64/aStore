// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteCard from "../../cards/FavoriteCard";

// CONFIGURATION
const FavoriteFilter = (props) => {
  // PROPERTIES
  const { type = "", showaddCart } = props;

  // API REQUESTS
  const { data: products } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  const productsFavorite = products.filter((product) => product.favorite === true);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <Fragment>
      {productsFavorite.length > 0 ? (
        <Fragment>
          {productsFavorite.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              <FavoriteCard product={product} type={type} showaddCart={showaddCart} />
            </div>
          ))}
        </Fragment>
      ) : (
        <div className="favorite-message">You haven't any product added to favorites</div>
      )}
    </Fragment>
  );
};

export default FavoriteFilter;
