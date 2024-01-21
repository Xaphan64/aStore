// ASSETS
import { cartFilledIcon, deleteIcon } from "../assets/MUI-icons";

// STYLES
import "./FavoriteCard.scss";

// LIBRARIES
import axios from "axios";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const FavoriteCard = (props) => {
  // PROPERTIES
  const { product, type, showaddCart, handleRemoveFavorite } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleAddCart = () => {
    const addToCart = {
      ...product,
      cart: true,
    };

    const productCategory = type || "";
    const id = product.id || "";

    const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));
    const listOfCartItems = getProductsList?.length > 0 ? getProductsList : [];

    let localCartList = [...listOfCartItems];

    if (productCategory && id) {
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, addToCart)
        .then((response) => {
          console.log("Added to cart", response);

          localCartList.push({
            price: product.price,
            id: product.id,
            type: product.type,
          });

          localStorage.setItem("cartProductsList", JSON.stringify(localCartList));

          showaddCart();
        })
        .catch((error) => {
          console.error("Error, could not add to cart", error);
        });

      console.log("Add to cart clicked");
    }
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="favorite-card">
      <div className="favorite-card-left">
        <img
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
          src={product.image}
          alt="N/a"
        />

        <span
          className="favorite-card-title"
          onClick={() => navigate(`/product/${product.id}`, { state: { currentCategory: type } })}
        >
          {product.name}
        </span>
      </div>
      <div className="favorite-card-right">
        <span className="favorite-card-price">{priceFormat(product.price)} Lei</span>

        <div className="favorite-card-add-button">
          <CustomButton type="button" onClick={handleAddCart}>
            <div>{cartFilledIcon}</div>
            <span>Add to cart</span>
          </CustomButton>
        </div>

        <div className="favorite-card-remove-button">
          <CustomButton type="button" onClick={() => handleRemoveFavorite(product)}>
            <div>{deleteIcon}</div>
            <span>Remove</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
