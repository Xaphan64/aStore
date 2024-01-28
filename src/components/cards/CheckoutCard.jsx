// ASSETS

// STYLES
import "./CheckoutCard.scss";
// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const CheckoutCard = (props) => {
  // PROPERTIES
  const { product } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="checkout-card-container">
      <img src={product.image} alt="N/a" />
      <span className="checkout-card-title">{product.name}</span>

      <span className="checkout-card-price">{priceFormat(product.price)} Lei</span>
    </div>
  );
};

export default CheckoutCard;
