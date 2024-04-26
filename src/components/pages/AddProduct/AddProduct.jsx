// ASSETS
import Placeholder from "./../../assets/Placeholder.png";
import { warningIcon } from "../../assets/MUI-icons";

// STYLES
import "./Product.scss";

// LIBRARIES
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import axios from "axios";

// MISC
import { useForm } from "../../hooks/useForm";
import { productType } from "../../config/productOptions";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomTextArea from "../../atoms/CustomTextArea";
import CustomInput from "../../atoms/CustomInput";
import CustomDropdown from "../../atoms/CustomDropdown";

// CONFIGURATION
const AddProduct = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const handleImageClick = () => {
    fileInput.current.click();
  };
  const admin = sessionStorage.getItem("adminToken");

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descError, setDescError] = useState("");
  const [imageError, setImageError] = useState("");
  const { inputValues, handleInputChange, handleImageChange } = useForm({
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
    favorite: false,
    cart: false,
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    //if name is empty throw error
    if (inputValues.name.trim() === "") {
      setNameError("Enter the product name");
    } else {
      setNameError("");
    }

    const priceRegex = /^\d+$/;

    //if price is empty or is not a number throw error
    if (inputValues.price.trim() === "") {
      setPriceError("Select the product's price");
    } else if (!priceRegex.test(inputValues.price)) {
      setPriceError("The price must be a number");
    } else {
      setPriceError("");
    }

    //if image empty throw error
    if (inputValues.image.trim() === "") {
      setImageError("You did not select the product image");
    } else {
      setImageError("");
    }

    //if description is empty throw error
    if (inputValues.description.trim() === "") {
      setDescError("Enter a product description");
    } else {
      setDescError("");
    }

    //for not having a grayed out button when errors are displayed
    if (
      inputValues.name === "" ||
      inputValues.price === "" ||
      inputValues.description === "" ||
      !priceRegex.test(inputValues.price) ||
      inputValues.image.trim() === ""
    ) {
      setIsPending(false);
    } else {
      setIsPending(true);
    }

    //if conditions are met add the product
    if (
      inputValues.name.trim() !== "" &&
      priceRegex.test(inputValues.price) &&
      inputValues.description.trim() !== "" &&
      inputValues.image.trim() !== ""
    ) {
      axios.post(`https://blog-data-9hab.onrender.com/${inputValues.type}`, inputValues).then(() => {
        setIsPending(false);
        navigate("/");
      });
    }
  };

  return (
    <div className="product-container">
      {admin ? (
        <Fragment>
          <h1>Add a new product</h1>

          <form onSubmit={handleSubmit}>
            <div className={nameError ? "product-fields red" : "product-fields"}>
              <CustomInput
                type="text"
                name="name"
                value={inputValues.name}
                placeholder="Select the product name"
                onChange={handleInputChange}
              />

              {nameError && (
                <div className="product-fields-error">
                  {warningIcon} {nameError}
                </div>
              )}
            </div>

            <div className={imageError ? "product-fields red" : "product-fields"}>
              <input
                className="image-input"
                type="file"
                name="image"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInput}
              />

              {inputValues.image ? (
                <img src={inputValues.image} alt="Selected" onClick={handleImageClick} />
              ) : (
                <img src={Placeholder} alt="Placeholder" onClick={handleImageClick} />
              )}

              {imageError && (
                <div className="product-fields-error">
                  {warningIcon} {imageError}
                </div>
              )}
            </div>

            <div className="product-fields">
              <CustomDropdown name="type" value={inputValues.type} onChange={handleInputChange} options={productType} />
            </div>

            <div className={priceError ? "product-fields red" : "product-fields"}>
              <CustomInput
                type="text"
                name="price"
                value={inputValues.price}
                placeholder="Set the price of the product"
                onChange={handleInputChange}
              />

              {priceError && (
                <div className="product-fields-error">
                  {warningIcon} {priceError}
                </div>
              )}
            </div>

            <div className={descError ? "product-fields red" : "product-fields"}>
              <CustomTextArea
                type="text"
                name="description"
                value={inputValues.description}
                placeholder="Enter the full product description, specifications and details"
                onChange={handleInputChange}
              />

              {descError && (
                <div className="product-fields-error">
                  {warningIcon} {descError}
                </div>
              )}
            </div>

            {isPending ? (
              <CustomButton disabled type="button" name="Adding..." />
            ) : (
              <Fragment>
                <CustomButton type="submit" name="Add product" />

                <CustomButton type="button" name="Cancel" className="button-red" onClick={() => navigate("/")} />
              </Fragment>
            )}
          </form>
        </Fragment>
      ) : (
        <div className="no-access-error">
          Error! No access to this page. You can go back to{" "}
          <Link className="link" to="/">
            Main Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
