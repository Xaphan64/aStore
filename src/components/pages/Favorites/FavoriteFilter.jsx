// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { Fragment, useEffect } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteCard from "../../cards/FavoriteCard";

// CONFIGURATION
const FavoriteFilter = (props) => {
  // PROPERTIES
  const { type = "", showaddCart } = props;

  // API REQUESTS
  const { data: products, setIsRerendering } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  const productsFavorite = products.filter((product) => product.favorite === true);

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    console.log(products);
  }, [products]);

  // EVENT HANDLERS
  const handleRemoveFavorite = (product) => {
    const removeFromFavorite = {
      ...product,
      favorite: false,
    };

    const productCategory = type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, removeFromFavorite)
        .then((response) => {
          console.log("Removed from favorite", response);
          setIsRerendering(response?.data?.favorite);
        })
        .catch((error) => {
          console.error("Error, could not remove from favorite", error);
        });

      console.log("Remove from favorite clicked");
    }
  };

  return (
    <Fragment>
      {productsFavorite.length > 0 ? (
        <Fragment>
          {productsFavorite.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              <FavoriteCard
                product={product}
                type={type}
                showaddCart={showaddCart}
                handleRemoveFavorite={handleRemoveFavorite}
              />
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
