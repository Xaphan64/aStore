// ASSETS
import { cartFilledIcon, deleteIcon } from "../assets/MUI-icons";
import CustomButton from "../atoms/CustomButton";

// STYLES
import "./FavoriteCard.scss";
// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const FavoriteCard = (props) => {
  // PROPERTIES
  const { product } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleAddCart = () => {
    console.log("add to cart clicked");
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleRemoveFavorites = () => {
    console.log("removed from favorites clicked");
  };

  return (
    <div className="favorite-card">
      <div className="favorite-card-left">
        <img src={product.image} alt="N/a" />

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
          <CustomButton type="button" onClick={handleRemoveFavorites}>
            <div>{deleteIcon}</div>
            <span>Remove</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
