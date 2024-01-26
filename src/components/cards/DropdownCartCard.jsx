// ASSETS
import { deleteIcon } from "../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const DropdownCartCard = (props) => {
  // PROPERTIES
  const { product, type, handleRemoveCart } = props;

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

      <div className="dropdown-favorite-card-footer">
        <div className="dropdown-favorite-buttons">
          <CustomButton type="button" onClick={() => handleRemoveCart(product)}>
            <div>{deleteIcon}</div>
            <span>Remove from cart</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DropdownCartCard;
