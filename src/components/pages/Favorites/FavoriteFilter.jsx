// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { Fragment, useState } from "react";

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
  const { data: products, setIsRerendering } = useFetch(`https://blog-data-9hab.onrender.com/${type}`);

  // LIBRARY CONSTANTS
  const productsFavorite = products.filter((product) => product.favorite === true);

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);

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
      setIsPending(true);

      axios
        .put(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`, removeFromFavorite)
        .then((response) => {
          // if list and length is not 0 delete the product with the same id
          if (getFavoriteList && getFavoriteList?.length > 0) {
            const updatedFavoriteList = getFavoriteList?.filter((product) => product.id !== id);

            //update the data in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(updatedFavoriteList));

            setFavoriteProductList(updatedFavoriteList);
          }

          setIsRerendering(response?.data?.favorite);
          setIsRerendering(response?.data?.cart);
          setIsRerendering(response?.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsPending(false);
        });
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
              isPending={isPending}
              setIsPending={setIsPending}
              handleRemoveFavorite={handleRemoveFavorite}
              setIsRerendering={setIsRerendering}
            />
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default FavoriteFilter;
