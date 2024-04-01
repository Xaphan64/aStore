// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";
import axios from "axios";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import CartCard from "../../cards/CartCard";
import DropdownCartCard from "../../cards/DropdownCartCard";
import CheckoutCard from "../../cards/CheckoutCard";

// CONFIGURATION
const CartFilter = (props) => {
  // PROPERTIES
  const { type = "", setCartProductList = () => {}, isHeader, isCheckout } = props;

  // API REQUESTS
  const { data: products, setIsRerendering } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  const productsCart = products.filter((product) => product.cart === true);
  const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleMoveFavorite = (product) => {
    const moveToFavorite = {
      ...product,
      cart: false,
      favorite: true,
    };

    const productCategory = type || "";
    const id = product.id || "";

    //get data from localStorage
    const getFavoriteList = JSON.parse(localStorage?.getItem("favoriteList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfFavoriteItems = getFavoriteList?.length > 0 ? getFavoriteList : [];

    let localFavoriteList = [...listOfFavoriteItems];

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, moveToFavorite)
        .then((response) => {
          console.log("Moved to favorite", response);

          if (getProductsList && getProductsList?.length > 0) {
            const updatedCartList = getProductsList?.filter((product) => !(product.id === id && product.type === type));

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
            setCartProductList(updatedCartList);

            //add id and type in localFavorite list
            localFavoriteList.push({
              id: product.id,
              type: product.type,
            });

            //save id and type in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(localFavoriteList));

            setIsRerendering(response?.data?.cart);
          }
        })
        .catch((error) => {
          console.error("Error, could not move to favorite", error);
        });

      console.log("Move to favorite clicked");
    }
  };

  const handleRemoveCart = (product) => {
    const removeFromCart = {
      ...product,
      cart: false,
    };

    const productCategory = type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, removeFromCart)
        .then((response) => {
          console.log("Removed from favorite", response);

          if (getProductsList && getProductsList?.length > 0) {
            const updatedCartList = getProductsList?.filter((product) => !(product.id === id && product.type === type));

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
            setCartProductList(updatedCartList);
            setIsRerendering(response?.data?.cart);
          }
        })
        .catch((error) => {
          console.error("Error, could not remove from cart", error);
        });

      console.log("Remove from cart clicked");
    }
  };

  return (
    <Fragment>
      {productsCart.length > 0 && (
        <Fragment>
          {productsCart.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              {!isHeader && !isCheckout && (
                <CartCard
                  product={product}
                  type={type}
                  handleMoveFavorite={handleMoveFavorite}
                  handleRemoveCart={handleRemoveCart}
                />
              )}

              {isHeader && <DropdownCartCard product={product} type={type} handleRemoveCart={handleRemoveCart} />}
              {isCheckout && <CheckoutCard product={product} type={type} />}
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartFilter;
