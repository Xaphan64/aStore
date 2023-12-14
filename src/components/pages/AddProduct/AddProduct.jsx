// ASSETS
import Placeholder from "./../../assets/Placeholder.png";
import { warningIcon } from "../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
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

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descError, setDescError] = useState("");
  const { inputValues, handleInputChange, handleImageChange } = useForm({
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
    favorite: false,
    cart: false,
    ordered: false,
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
      setPriceError("Select the product price");
    } else if (!priceRegex.test(inputValues.price)) {
      setPriceError("The price must be a number");
    } else {
      setPriceError("");
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
      !priceRegex.test(inputValues.price)
    ) {
      setIsPending(false);
    } else {
      setIsPending(true);
    }

    //if conditions are met add the product
    if (inputValues.name.trim() !== "" && priceRegex.test(inputValues.price) && inputValues.description.trim() !== "") {
      axios.post(`http://localhost:8000/${inputValues.type}`, inputValues).then((response) => {
        console.log("product added sucesfully", response);
        setIsPending(false);
        navigate("/");
      });
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add a new product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <span>Product name:</span>
          <CustomInput type="text" name="name" value={inputValues.name} onChange={handleInputChange} />

          {nameError && (
            <div>
              {warningIcon} {nameError}
            </div>
          )}
        </div>

        <div>
          <span>Product image:</span>
          {inputValues.image ? (
            <img src={inputValues.image} alt="Selected" style={{ width: 500, height: 500 }} />
          ) : (
            <img src={Placeholder} alt="Placeholder" style={{ width: 500, height: 500 }} />
          )}

          <CustomInput type="file" name="image" onChange={handleImageChange} required />
        </div>

        <div>
          <span>Product type:</span>
          <CustomDropdown name="type" value={inputValues.type} onChange={handleInputChange} options={productType} />
        </div>

        <div>
          <span>Product price:</span>
          <CustomInput type="text" name="price" value={inputValues.price} onChange={handleInputChange} />

          {priceError && (
            <div>
              {warningIcon} {priceError}
            </div>
          )}
        </div>

        <div>
          <span>Product description:</span>
          <CustomTextArea type="text" name="description" value={inputValues.description} onChange={handleInputChange} />

          {descError && (
            <div>
              {warningIcon} {descError}
            </div>
          )}
        </div>

        {isPending ? (
          <CustomButton disabled type="button" name="Adding..." />
        ) : (
          <Fragment>
            <CustomButton type="submit" name="Add product" />

            <CustomButton type="button" name="Cancel" onClick={() => navigate("/")} />
          </Fragment>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
