// ASSETS
import { cartFilledIcon, favoriteIcon, favoriteAddedIcon } from "../assets/MUI-icons";

// STYLES
import "./ProductCard.scss";

// LIBRARIES
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { product, type, category, showAddFavorite, showRemoveFavorite, showaddCart } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [addFavorite, setAddFavorite] = useState(false);

  // LIFE CYCLE
  useEffect(() => {
    const productCategory = category || type;
    const id = product.id || "";

    axios
      .get(`http://localhost:8000/${productCategory}/${id}`)
      .then((response) => {
        setAddFavorite(response.data.favorite);
      })
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  const handleFavorite = (favStatus) => {
    setAddFavorite(favStatus);

    const updatedFavorite = {
      ...product,
      favorite: favStatus,
    };

    const productCategory = category || type || "";
    const id = product.id || "";

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, updatedFavorite)
        .then((response) => {
          if (favStatus) {
            console.log("Added to favorite", response);
            showAddFavorite();
          } else {
            console.log("Removed from favorite", response);
            showRemoveFavorite();
          }
        })
        .catch((error) => {
          console.error("Error updating favorite status", error);
        });
    }
  };

  const handleAddCart = () => {
    console.log("add to cart clicked");
    showaddCart();
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

          <CustomButton type="button">
            {addFavorite ? (
              <div className="favorite-button added" onClick={() => handleFavorite(false)}>
                {favoriteAddedIcon}
              </div>
            ) : (
              <div className="favorite-button" onClick={() => handleFavorite(true)}>
                {favoriteIcon}
              </div>
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
