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
  const { product, type, handleMoveFavorite, handleRemoveCart } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
          <CustomButton type="button" onClick={() => handleMoveFavorite(product)}>
            <div>{cartFilledIcon}</div>
            <span>Move to Favorite</span>
          </CustomButton>
        </div>

        <div className="favorite-card-remove-button">
          <CustomButton type="button" onClick={() => handleRemoveCart(product)}>
            <div>{deleteIcon}</div>
            <span>Remove</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
