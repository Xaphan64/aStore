// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteCard from "../../cards/FavoriteCard";
import DropdownFavoriteCard from "../../cards/DropdownFavoriteCard";

// CONFIGURATION
const FavoriteFilter = (props) => {
  // PROPERTIES
  const { type = "", showaddCart, showAlreadyCart, setFavoriteProductList = () => {}, isHeader } = props;

  // API REQUESTS
  const { data: products, setIsRerendering } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  const productsFavorite = products.filter((product) => product.favorite === true);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleRemoveFavorite = (product) => {
    const removeFromFavorite = {
      ...product,
      favorite: false,
    };

    const productCategory = type || "";
    const id = product.id || "";

    const getFavoriteList = JSON.parse(localStorage?.getItem("favoriteList"));

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, removeFromFavorite)
        .then((response) => {
          console.log("Removed from favorite", response);

          // if list and length is not 0 delete the product with the same id and type
          if (getFavoriteList && getFavoriteList?.length > 0) {
            const updatedFavoriteList = getFavoriteList?.filter(
              (product) => !(product.id === id && product.type === type)
            );

            //update the data in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(updatedFavoriteList));

            setFavoriteProductList(updatedFavoriteList);
          }

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
      {productsFavorite.map((product, index) => (
        <div className="favorite-map" key={`category-${index}-${product?.id}`}>
          {isHeader ? (
            <DropdownFavoriteCard product={product} type={type} />
          ) : (
            <FavoriteCard
              product={product}
              type={type}
              showaddCart={showaddCart}
              showAlreadyCart={showAlreadyCart}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default FavoriteFilter;
