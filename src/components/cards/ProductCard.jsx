// ASSETS
import { cartFilledIcon, favoriteIcon, favoriteAddedIcon } from "../assets/MUI-icons";

// STYLES
import "./ProductCard.scss";

// LIBRARIES
import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { product, type } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/")[location.pathname.split("/").length - 1];

  // STATE CONSTANTS
  const [addFavorite, setAddFavorite] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleFavorite = () => {
    console.log("favorite clicked");
    setAddFavorite(!addFavorite);
  };

  const handleAddCart = () => {
    console.log("add to cart clicked");
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="product-card">
      <div className="product-card-body">
        <div className="product-card-image">
          <img
            onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: category || type } })}
            src={product.image}
            alt="N/a"
          />

          <CustomButton type="button" onClick={handleFavorite}>
            {addFavorite ? (
              <div className="favorite-button added">{favoriteAddedIcon}</div>
            ) : (
              <div className="favorite-button">{favoriteIcon}</div>
            )}
          </CustomButton>
        </div>

        <span
          className="product-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: category || type } })}
        >
          {product.name}
        </span>
      </div>

      <div className="product-card-footer">
        <span className="product-card-price">{priceFormat(product.price)} Lei</span>
        <CustomButton type="button" onClick={handleAddCart}>
          <div>{cartFilledIcon}</div>
          <span>Add to cart</span>
        </CustomButton>
      </div>
    </div>
  );
};

ProductCard.propsTypes = {
  product: propTypes.array,
};

export default ProductCard;
