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
  const { type = "" } = props;

  // API REQUESTS
  const { data: products } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const productsFavorite = products.filter((product) => product.favorite === true);

  console.log("productsFavorite.length :>> ", productsFavorite.length);
  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <Fragment>
      {productsFavorite.length > 0 ? (
        <Fragment>
          {productsFavorite.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              <FavoriteCard product={product} type={type} />
            </div>
          ))}
        </Fragment>
      ) : (
        <div>No favorite products</div>
      )}
    </Fragment>
  );
};

export default FavoriteFilter;
