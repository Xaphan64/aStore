// ASSETS
import { warningIcon } from "../../assets/MUI-icons";

// STYLES
import "./Checkout.scss";

// LIBRARIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [cardError, setCardError] = useState("");
  const { inputValues, handleInputChange } = useForm({
    name: "",
    phone: "",
    address: "",
    payMethod: "",
    card: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleOrder = (event) => {
    event.preventDefault();

    // if name is empty show error
    if (inputValues.name.trim() === "") {
      setNameError("Enter your name");
    } else {
      setNameError("");
    }

    const phoneRegex = /^\d{10,}$/;

    //if phone empty or is not min 10 characters and not a number show error
    if (inputValues.phone.trim() === "") {
      setPhoneError("Type your phone number");
    } else if (!phoneRegex.test(inputValues.phone)) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }

    //if address is empty throw error message
    if (inputValues.address.trim() === "") {
      setAddressError("Enter the address where you want the order to be delivered");
    } else {
      setAddressError("");
    }

    //if none of the radio types are selected throw error
    if (inputValues.payMethod.trim() === "") {
      setPaymentError("Please choose one of the payment methods");
    } else {
      setPaymentError("");
    }

    const cardRegex = /^\d{16}$/;

    // if card input is empty or not valid throw error
    if (inputValues.card.trim() === "") {
      setCardError("Type your card number");
    } else if (!cardRegex.test(inputValues.card)) {
      setCardError("Please enter a valid card number");
    } else {
      setCardError("");
    }

    //if all of the above conditions are true, redirect to orders page and change all products in cart to false
    if (
      inputValues.name.trim() !== "" &&
      phoneRegex.test(inputValues.phone) &&
      inputValues.address.trim() !== "" &&
      (inputValues.payMethod.trim() === "payOnDelivery" ||
        (inputValues.payMethod.trim() === "onlineCard" && cardRegex.test(inputValues.card)))
    ) {
      const cartProductList = JSON.parse(localStorage?.getItem("cartProductsList"));

      cartProductList?.forEach((product) => {
        axios.get(`http://localhost:8000/${product.type}`).then((response) => {
          const fetchedData = response.data;
          console.log("response :>> ", fetchedData);

          fetchedData?.forEach((fetchedProduct) => {
            if (fetchedProduct.id === product.id) {
              const updatedProductList = {
                ...fetchedProduct,
                cart: false,
              };
              axios.put(`http://localhost:8000/${product.type}/${fetchedProduct.id}`, updatedProductList);
              console.log("updatedProductList :>> ", updatedProductList);
            }
          });
        });
      });

      localStorage?.removeItem("cartProductsList");
      navigate("/success");
    }
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

          <div className={nameError ? "checkout-fields red" : "checkout-fields"}>
            <span>Name:</span>
            <CustomInput
              type="text"
              name="name"
              placeholder="First and last name"
              value={inputValues.name}
              onChange={handleInputChange}
            />

            {nameError && (
              <div className="checkout-error">
                {warningIcon} {nameError}
              </div>
            )}
          </div>

          <div className={phoneError ? "checkout-fields red" : "checkout-fields"}>
            <span>Phone number:</span>
            <CustomInput type="text" name="phone" value={inputValues.phone} onChange={handleInputChange} />

            {phoneError && (
              <div className="checkout-error">
                {warningIcon} {phoneError}
              </div>
            )}
          </div>

          <div className={addressError ? "checkout-fields red" : "checkout-fields"}>
            <span>Delivery address:</span>
            <CustomInput type="text" name="address" value={inputValues.address} onChange={handleInputChange} />

            {addressError && (
              <div className="checkout-error">
                {warningIcon} {addressError}
              </div>
            )}
          </div>

          <div className={paymentError ? "checkout-fields radio" : "checkout-fields"}>
            <span>Payment method:</span>

            <div className="checkout-radio">
              <CustomInput
                type="radio"
                name="payMethod"
                value="onlineCard"
                id="onlineCard"
                checked={inputValues.payMethod === "onlineCard"}
                onChange={handleInputChange}
              />
              <label
                onClick={() => handleInputChange({ target: { name: "payMethod", value: "onlineCard" } })}
                htmlFor="onlineCard"
              >
                Online Card
              </label>
            </div>

            {inputValues.payMethod === "onlineCard" && (
              <div className={cardError ? "checkout-fields red" : "checkout-fields"}>
                <span>Card details:</span>
                <CustomInput type="text" name="card" value={inputValues.card} onChange={handleInputChange} />

                {cardError && (
                  <div className="checkout-error">
                    {warningIcon} {cardError}
                  </div>
                )}
              </div>
            )}

            <div className="checkout-radio">
              <CustomInput
                type="radio"
                name="payMethod"
                value="payOnDelivery"
                id="payOnDelivery"
                checked={inputValues.payMethod === "payOnDelivery"}
                onChange={handleInputChange}
              />
              <label
                onClick={() => handleInputChange({ target: { name: "payMethod", value: "payOnDelivery" } })}
                htmlFor="payOnDelivery"
              >
                Pay on Delivery
              </label>
            </div>
            {paymentError && (
              <div className="checkout-error">
                {warningIcon} {paymentError}
              </div>
            )}
          </div>
        </div>

        <CustomButton name="Order" />
      </form>
    </div>
  );
};

export default Checkout;
