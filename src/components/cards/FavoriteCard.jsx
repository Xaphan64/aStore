// ASSETS
import { cartFilledIcon, deleteIcon } from "../assets/MUI-icons";

// STYLES
import "./FavoriteCard.scss";

// LIBRARIES
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const FavoriteCard = (props) => {
  // PROPERTIES
  const { product, type } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleAddCart = () => {
    console.log("add to cart clicked");
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleRemoveFavorite = () => {
    const removeFromFavorite = {
      ...product,
      favorite: false,
    };

    axios
      .put(`http://localhost:8000/${state?.currentCategory}/${id}`, removeFromFavorite)
      .then((response) => {
        console.log("Removed from favorite", response);
      })
      .catch((error) => {
        console.error("Error, could not remove from favorite", error);
      });

    console.log("Remove from favorite clicked");
  };

  return (
    <div className="favorite-card">
      <div className="favorite-card-left">
        <img
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
          src={product.image}
          alt="N/a"
        />

        <span className="favorite-card-title">{product.name}</span>
      </div>
      <div className="favorite-card-right">
        <span className="favorite-card-price">{priceFormat(product.price)} Lei</span>

        <div className="favorite-card-add-button">
          <CustomButton type="button" onClick={handleAddCart}>
            <div>{cartFilledIcon}</div>
            <span>Add to cart</span>
          </CustomButton>
        </div>

        <div className="favorite-card-remove-button">
          <CustomButton type="button" onClick={handleRemoveFavorite}>
            <div>{deleteIcon}</div>
            <span>Remove</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
