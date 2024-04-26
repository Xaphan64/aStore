// ASSETS

// STYLES

// LIBRARIES
import { Fragment, useState } from "react";
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
  const { data: products, setIsRerendering } = useFetch(`https://blog-data-9hab.onrender.com/${type}`);

  // LIBRARY CONSTANTS
  const productsCart = products.filter((product) => product.cart === true);
  const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);

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
      setIsPending(true);

      axios
        .put(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`, moveToFavorite)
        .then((response) => {
          if (getProductsList && getProductsList?.length > 0) {
            // const updatedCartList = getProductsList?.filter((product) => !(product.id === id && product.type === type));
            const updatedCartList = getProductsList?.filter((product) => product.id !== id);

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
            setCartProductList(updatedCartList);

            //add id and type in localFavorite list
            if (localFavoriteList === 0) {
              localFavoriteList.push({
                id: product.id,
              });
            } else {
              const productExist = listOfFavoriteItems.some((item) => item.id === product.id);

              //if product doesn't exist, push id in localStorage
              if (!productExist) {
                localFavoriteList.push({
                  id: product.id,
                });
              }
            }

            //save id in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(localFavoriteList));

            setIsRerendering(response?.data?.cart);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsPending(false);
        });
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
      setIsPending(true);

      axios
        .put(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`, removeFromCart)
        .then((response) => {
          if (getProductsList && getProductsList?.length > 0) {
            const updatedCartList = getProductsList?.filter((product) => product.id !== id);

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
            setCartProductList(updatedCartList);
            setIsRerendering(response?.data?.cart);
          }
        })
        .catch((error) => {
          console.error("Error, could not remove from cart", error);
        })
        .finally(() => {
          setIsPending(false);
        });
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
                  isPending={isPending}
                  handleMoveFavorite={handleMoveFavorite}
                  handleRemoveCart={handleRemoveCart}
                />
              )}

              {isHeader && <DropdownCartCard product={product} type={type} />}
              {isCheckout && <CheckoutCard product={product} type={type} />}
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartFilter;
