// ASSETS
import { cartFilledIcon, favoriteIcon, favoriteAddedIcon } from "../assets/MUI-icons";

// STYLES
import "./ProductCard.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { product, type, showAddFavorite, showRemoveFavorite, showaddCart, setIsRerendering } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [addFavorite, setAddFavorite] = useState(product?.favorite || false);

  // LIFE CYCLE
  useEffect(() => {
    const productCategory = type;
    const id = product.id || "";

    axios
      .get(`http://localhost:8000/${productCategory}/${id}`)
      .then((response) => {
        setAddFavorite(response.data.favorite);
      })
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, [type]);

  // EVENT HANDLERS
  const handleFavorite = (favStatus) => {
    setAddFavorite(favStatus);

    //change the favorite status of the product
    const updatedFavorite = {
      ...product,
      favorite: favStatus,
    };

    console.log("updatedFavorite Cart:>> ", updatedFavorite.cart);
    console.log("updatedFavorite Favorite:>> ", updatedFavorite.favorite);

    const productCategory = type || "";
    const id = product.id || "";

    //get data from localStorage
    const getFavoriteList = JSON.parse(localStorage?.getItem("favoriteList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfFavoriteItems = getFavoriteList?.length > 0 ? getFavoriteList : [];

    let localFavoriteList = [...listOfFavoriteItems];

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, updatedFavorite)
        .then((response) => {
          if (favStatus) {
            console.log("Added to favorite", response);

            //add id and type in localFavorite list
            localFavoriteList.push({
              id: product.id,
              type: product.type,
            });

            //save id and type in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(localFavoriteList));

            setIsRerendering(response?.data);

            showAddFavorite();
          } else {
            console.log("Removed from favorite", response);

            // if list and length is not 0 delete the product with the same id and type
            if (getFavoriteList && getFavoriteList?.length > 0) {
              const updatedFavoriteList = getFavoriteList?.filter(
                (product) => !(product.id === id && product.type === type)
              );

              //update the data in localStorage
              localStorage.setItem("favoriteList", JSON.stringify(updatedFavoriteList));
            }

            setIsRerendering(response?.data);

            showRemoveFavorite();
          }
        })
        .catch((error) => {
          console.error("Error updating favorite status", error);
        });
    }
  };

  const handleAddCart = () => {
    //change the cart status of the product
    const addToCart = {
      ...product,
      cart: true,
    };

    console.log("addToCart Cart:>> ", addToCart.cart);
    console.log("addToCart Favorite:>> ", addToCart.favorite);

    const productCategory = type || "";
    const id = product.id || "";

    //get data from localStorage
    const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfCartItems = getProductsList?.length > 0 ? getProductsList : [];

    let localCartList = [...listOfCartItems];

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, addToCart)
        .then((response) => {
          console.log("Added to cart", response);

          //add id, type and price in localCartList list
          // console.log("localCartList.length :>> ", localCartList.length);
          if (localCartList.length === 0) {
            // TOODO ADD SNACKBAR THAT THE PRODUCT WAS ADDED
            localCartList.push({
              name: product.name,
              price: product.price,
              id: product.id,
              type: product.type,
            });
          } else {
            const productExist = listOfCartItems.some((item) => item.id === product.id && item.type === product.type);

            if (!productExist) {
              // TOODO ADD SNACKBAR THAT THE PRODUCT WAS ADDED
              localCartList.push({
                name: product.name,
                price: product.price,
                id: product.id,
                type: product.type,
              });
            } else {
              // TOODO ADD SNACKBAR THAT THE PRODUCT ALREADY EXIST
            }
          }

          console.log("localCartList :>> ", localCartList);

          //save data in localStorage
          localStorage.setItem("cartProductsList", JSON.stringify(localCartList));

          setIsRerendering(response?.data);

          showaddCart();
        })
        .catch((error) => {
          console.error("Error, could not add to cart", error);
        });

      console.log("Add to cart clicked");
    }
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="product-card">
      <div className="product-card-body">
        <div className="product-card-image">
          <img
            onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
            src={product.image}
            alt="N/a"
          />

          <CustomButton type="button">
            {addFavorite && product.type === type ? (
              <div className="favorite-button added" onClick={() => handleFavorite(false)}>
                {favoriteAddedIcon}
              </div>
            ) : (
              <div className="favorite-button" onClick={() => handleFavorite(true)}>
                {favoriteIcon}
              </div>
            )}
          </CustomButton>
        </div>

        <span
          className="product-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        >
          {product.name}
        </span>
      </div>

      <div className="product-card-footer">
        <span className="product-card-price">{priceFormat(product.price)} Lei</span>
        <CustomButton type="button" onClick={handleAddCart}>
          <div>{cartFilledIcon}</div>
          <span>Add to cart</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductCard;
