// ASSETS

// STYLES
import "./Checkout.scss";
// LIBRARIES

// MISC
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import Cart from "../Cart/Cart";
import CustomInput from "../../atoms/CustomInput";

// CONFIGURATION
const Checkout = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const cartProductList = JSON.parse(localStorage?.getItem("cartProductsList"));
  const isCheckout = true;

  // STATE CONSTANTS
  const { inputValues, handleInputChange } = useForm({
    name: "",
    phone: "",
    address: "",
    card: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleOrder = (event) => {
    event.preventDefault();
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <form onSubmit={handleOrder} className="checkout-form">
        <div className="checkout-products">
          You are about to order the following {cartProductList?.length === 1 ? "product" : "products"}:
        </div>

        <Cart isCheckout={isCheckout} />

        <div className="checkout-details">
          <h2>Order details</h2>

          <div className="checkout-fields">
            <span>Full name:</span>
            <CustomInput type="text" name="name" value={inputValues.name} onChange={handleInputChange} />
          </div>

          <span>Phone number</span>
          <input />

          <span>Delivery address</span>
          <input />

          <span>Payment method:</span>
          <div>
            <span>online card</span>

            <input />

            <span>Pay on delivery</span>
          </div>
        </div>

        <CustomButton name="Order" />
      </form>
    </div>
  );
};

export default Checkout;
