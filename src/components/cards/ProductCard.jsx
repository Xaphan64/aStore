// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";

// MISC

// COMPONENTS

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
        <span>{product.price}</span>
        <CustomButton type="button">Add Card</CustomButton>
      </div>
    </div>
  );
};

export default ProductCard;
