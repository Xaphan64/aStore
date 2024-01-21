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
  const { product, type, showAddFavorite, showRemoveFavorite, showaddCart } = props;

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

    const updatedFavorite = {
      ...product,
      favorite: favStatus,
    };

    const productCategory = type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, updatedFavorite)
        .then((response) => {
          if (favStatus) {
            console.log("Added to favorite", response);
            showAddFavorite();
          } else {
            console.log("Removed from favorite", response);
            showRemoveFavorite();
          }
        })
        .catch((error) => {
          console.error("Error updating favorite status", error);
        });
    }
  };

  const handleAddCart = () => {
    const addToCart = {
      ...product,
      cart: true,
    };

    const productCategory = type || "";
    const id = product.id || "";

    const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));
    const listOfCartItems = getProductsList?.length > 0 ? getProductsList : [];

    let localCartList = [...listOfCartItems];

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, addToCart)
        .then((response) => {
          console.log("Added to cart", response);

          localCartList.push({
            price: product.price,
            id: product.id,
            type: product.type,
          });

          localStorage.setItem("cartProductsList", JSON.stringify(localCartList));

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
