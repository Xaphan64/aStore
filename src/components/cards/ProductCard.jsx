// ASSETS

// STYLES

// LIBRARIES
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { product } = props;
  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleFavorite = () => {
    console.log("favorite clicked");
  };

  return (
    <div className="product-card">
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <div>
          <CustomButton type="button" onClick={handleFavorite}>
            Favorite
          </CustomButton>
          <img src={product.image} alt="N/a" style={{ width: 20, height: 20 }} />
        </div>

        <span>{product.name}</span>
      </div>

      <div>
        <span>{product.price} RON</span>
        <CustomButton type="button">Add Card</CustomButton>
      </div>
    </div>
  );
};

ProductCard.propsTypes = {
  deleteProduct: propTypes.func.isRequired,
  products: propTypes.array,
};

export default ProductCard;
