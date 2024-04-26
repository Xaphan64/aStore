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
  const { product, type, showAddFavorite, showRemoveFavorite, showaddCart, showAlreadyCart, setIsRerendering } = props;

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
      .get(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`)
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

    const productCategory = type || "";
    const id = product.id || "";

    //get data from localStorage
    const getFavoriteList = JSON.parse(localStorage?.getItem("favoriteList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfFavoriteItems = getFavoriteList?.length > 0 ? getFavoriteList : [];

    let localFavoriteList = [...listOfFavoriteItems];

    if (productCategory && id) {
      axios
        .put(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`, updatedFavorite)
        .then((response) => {
          if (favStatus) {
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
          console.error(error);
        });
    }
  };

  const handleAddCart = () => {
    //change the cart status of the product
    const addToCart = {
      ...product,
      cart: true,
    };

    const productCategory = type || "";
    const id = product.id || "";

    //get data from localStorage
    const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfCartItems = getProductsList?.length > 0 ? getProductsList : [];

    let localCartList = [...listOfCartItems];

    if (productCategory && id) {
      axios
        .put(`https://blog-data-9hab.onrender.com/${productCategory}/${id}`, addToCart)
        .then((response) => {
          //if cart list is empty, push name, id, type and price in localCartList
          if (localCartList.length === 0) {
            localCartList.push({
              name: product.name,
              price: product.price,
              id: product.id,
              type: product.type,
            });

            showaddCart();
          } else {
            const productExist = listOfCartItems.some((item) => item.id === product.id && item.type === product.type);

            //if id and type are not the same, push localCartList
            if (!productExist) {
              localCartList.push({
                name: product.name,
                price: product.price,
                id: product.id,
                type: product.type,
              });

              showaddCart();
            } else {
              showAlreadyCart();
            }
          }
          setIsRerendering(response?.data);

          //save data in localStorage
          localStorage.setItem("cartProductsList", JSON.stringify(localCartList));
        })
        .catch((error) => {
          console.error("Error, could not add to cart", error);
        });
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
