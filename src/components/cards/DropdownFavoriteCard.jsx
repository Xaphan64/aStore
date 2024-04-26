// ASSETS

// STYLES
import "./DropdownFavoriteCard.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const DropdownFavoriteCard = (props) => {
  // PROPERTIES
  const { product, type } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  return (
    <div className="dropdown-favorite-card">
      <div className="dropdown-favorite-card-header">
        <img
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
          src={product.image}
          alt="N/a"
        />
        <span
          className="dropdown-favorite-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        >
          {product.name}
        </span>

        <span className="dropdown-favorite-card-price">{priceFormat(product.price)} Lei</span>
      </div>
    </div>
  );
};

export default DropdownFavoriteCard;
