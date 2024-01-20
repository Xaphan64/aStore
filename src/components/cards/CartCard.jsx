// ASSETS
import { cartFilledIcon, deleteIcon } from "../assets/MUI-icons";

// STYLES
import "./FavoriteCard.scss";

// LIBRARIES
import axios from "axios";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const CartCard = (props) => {
  // PROPERTIES
  const { product, type } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleMoveFavorite = () => {
    const removeFromFavorite = {
      ...product,
      cart: false,
      favorite: true,
    };

    const productCategory = type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, removeFromFavorite)
        .then((response) => {
          console.log("Moved to favorite", response);

          if (getProductsList && getProductsList?.length > 0) {
            const updatedCartList = getProductsList?.filter((product) => !(product.id === id && product.type === type));

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
          }
        })
        .catch((error) => {
          console.error("Error, could not move to favorite", error);
        });

      console.log("Move to favorite clicked");
    }
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleRemoveCart = () => {
    const removeFromFavorite = {
      ...product,
      cart: false,
    };

    const productCategory = type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, removeFromFavorite)
        .then((response) => {
          console.log("Removed from favorite", response);

          if (getProductsList && getProductsList?.length > 0) {
            const updatedCartList = getProductsList?.filter((product) => !(product.id === id && product.type === type));

            localStorage.setItem("cartProductsList", JSON.stringify(updatedCartList));
          }
        })
        .catch((error) => {
          console.error("Error, could not remove from favorite", error);
        });

      console.log("Remove from favorite clicked");
    }
  };

  return (
    <div className="favorite-card">
      <div className="favorite-card-left">
        <img
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
          src={product.image}
          alt="N/a"
        />

        <span
          className="favorite-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        >
          {product.name}
        </span>
      </div>
      <div className="favorite-card-right">
        <span className="favorite-card-price">{priceFormat(product.price)} Lei</span>

        <div className="favorite-card-remove-button">
          <CustomButton type="button" onClick={handleMoveFavorite}>
            <div>{cartFilledIcon}</div>
            <span>Move to Favorite</span>
          </CustomButton>
        </div>

        <div className="favorite-card-remove-button">
          <CustomButton type="button" onClick={handleRemoveCart}>
            <div>{deleteIcon}</div>
            <span>Remove</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
