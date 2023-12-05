// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";
import propTypes from "prop-types";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";
import { Link } from "react-router-dom";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { deleteProduct, products } = props;
  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
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
