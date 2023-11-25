// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="product-card">
      <div>
        <button>Favorite</button>
        <img src={product.image} alt="N/a" style={{ width: 20, height: 20 }} />
      </div>

      <span>{product.name}</span>

      <div>
        <span>{product.price}</span>
        <button>Add Card</button>
      </div>

      <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit Product</button>
    </div>
  );
};

export default ProductCard;
