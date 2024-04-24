// ASSETS

// STYLES
import "./SearchCard.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const SearchCard = ({ product, type }) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="search-card-container">
      <img
        onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        src={product.image}
        alt="N/a"
      />
      <div className="search-card-text">
        <span
          className="search-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        >
          {product.name}
        </span>

        <span className="search-card-description">{product.description}</span>
      </div>

      <span className="search-card-price">{priceFormat(product.price)} Lei</span>
    </div>
  );
};

export default SearchCard;
