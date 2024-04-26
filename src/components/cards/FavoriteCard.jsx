// ASSETS
import { cartFilledIcon, deleteIcon } from "../assets/MUI-icons";

// STYLES
import "./FavoriteCard.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";

// CONFIGURATION
const FavoriteCard = (props) => {
  // PROPERTIES
  const { product, type, showaddCart, showAlreadyCart } = props;
  const { handleRemoveFavorite, setIsRerendering, setIsPending, isPending } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 500px")?.matches;

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
      setIsPending(true);
      axios
        .put(`http://localhost:8000/${productCategory}/${id}`, addToCart)
        .then((response) => {
          setIsRerendering(response?.data);

          if (localCartList.length === 0) {
            localCartList.push({
              name: product.name,
              price: product.price,
              id: product.id,
              type: product.type,
            });

            showaddCart();
          } else {
            // const productExist = listOfCartItems.some((item) => item.id === product.id && item.type === product.type);
            const productExist = listOfCartItems.some((item) => item.id === product.id);

            if (!productExist) {
              localCartList.push({
                name: product.name,
                price: product.price,
                id: product.id,
                type: product.type,
              });

              showaddCart();
            } else {
              showAlreadyCart();
            }
          }

          localStorage.setItem("cartProductsList", JSON.stringify(localCartList));
        })

        .catch((error) => {
          console.error("Error, could not add to cart", error);
        })
        .finally(() => {
          setIsPending(false);
        });
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

      {isMobile ? (
        <div className="favorite-card-right">
          <div className="favorite-card-add-button">
            {isPending ? (
              <CustomButton type="button" disabled>
                <div>{cartFilledIcon}</div>
                <span>Add to cart</span>
              </CustomButton>
            ) : (
              <CustomButton type="button" onClick={handleAddCart}>
                <div>{cartFilledIcon}</div>
                <span>Add to cart</span>
              </CustomButton>
            )}
          </div>

          <div className="favorite-card-remove-button">
            {isPending ? (
              <CustomButton type="button" disabled>
                <div>{deleteIcon}</div>
                <span>Remove</span>
              </CustomButton>
            ) : (
              <CustomButton type="button" onClick={() => handleRemoveFavorite(product)}>
                <div>{deleteIcon}</div>
                <span>Remove</span>
              </CustomButton>
            )}
          </div>

          <span className="favorite-card-price">{priceFormat(product.price)} Lei</span>
        </div>
      ) : (
        <div className="favorite-card-right">
          <span className="favorite-card-price">{priceFormat(product.price)} Lei</span>

          <div className="favorite-card-add-button">
            {isPending ? (
              <CustomButton type="button" disabled>
                <div>{cartFilledIcon}</div>
                <span>Add to cart</span>
              </CustomButton>
            ) : (
              <CustomButton type="button" onClick={handleAddCart}>
                <div>{cartFilledIcon}</div>
                <span>Add to cart</span>
              </CustomButton>
            )}
          </div>

          <div className="favorite-card-remove-button">
            {isPending ? (
              <CustomButton type="button" disabled>
                <div>{deleteIcon}</div>
                <span>Remove</span>
              </CustomButton>
            ) : (
              <CustomButton type="button" onClick={() => handleRemoveFavorite(product)}>
                <div>{deleteIcon}</div>
                <span>Remove</span>
              </CustomButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
