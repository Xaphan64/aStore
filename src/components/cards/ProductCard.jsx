// ASSETS

// STYLES
import "./ProductCard.scss";

// LIBRARIES
import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";
import { cartIcon, favoriteIcon, favoriteAddedIcon } from "../assets/MUI-icons";
import { useState } from "react";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { product } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/")[location.pathname.split("/").length - 1];

  console.log(location.pathname.split("/")[location.pathname.split("/").length - 1]);
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

  return (
    <div className="product-card">
      <div className="product-card-body">
        <div>
          <img
            onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: category } })}
            src={product.image}
            alt="N/a"
            style={{ width: 220, height: 220 }}
          />

          <CustomButton type="button" onClick={handleFavorite}>
            {addFavorite ? <div class>{favoriteAddedIcon}</div> : <div>{favoriteIcon}</div>}
          </CustomButton>
        </div>

        <span onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: category } })}>
          {product.name}
        </span>
      </div>

      <div className="product-card-footer">
        <span>{product.price} RON</span>
        <CustomButton type="button" onClick={handleAddCart}>
          {cartIcon}
        </CustomButton>
      </div>
    </div>
  );
};

ProductCard.propsTypes = {
  product: propTypes.array,
};

export default ProductCard;
