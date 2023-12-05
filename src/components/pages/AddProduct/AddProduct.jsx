// ASSETS
import Placeholder from "./../../assets/Placeholder.png";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MISC
import { useForm } from "../../hooks/useForm";
import { productType } from "../../config/productOptions";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomTextArea from "../../atoms/CustomTextArea";
import CustomInput from "../../atoms/CustomInput";
import CustomDropdown from "../../atoms/CustomDropdown";
import { useState } from "react";

// CONFIGURATION
const AddProduct = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);
  const { inputValues, handleInputChange, handleImageChange } = useForm({
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    axios.post("http://localhost:8000/products", inputValues).then((response) => {
      console.log("product added sucesfully", response);
      setIsPending(false);
      navigate("/");
    });
  };

  // const handleUploadImage = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  // };

  return (
    <div className="manage-product-container">
      <h1>Add a new product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <span>Product name:</span>
          <CustomInput type="text" name="name" value={inputValues.name} onChange={handleInputChange} />
        </div>

        <div>
          <span>Product description:</span>
          <CustomTextArea type="text" name="description" value={inputValues.description} onChange={handleInputChange} />
        </div>

        <div>
          <span>Product image:</span>
          {inputValues.image ? (
            <img src={inputValues.image} alt="Selected" style={{ width: 500, height: 500 }} />
          ) : (
            <img src={Placeholder} alt="Placeholder" style={{ width: 500, height: 500 }} />
          )}

          <CustomInput type="file" name="image" onChange={handleImageChange} />
        </div>

        <div>
          <span>Product type:</span>
          <CustomDropdown name="type" value={inputValues.type} onChange={handleInputChange} options={productType} />
        </div>

        <div>
          <span>Product price:</span>
          <CustomInput type="text" name="price" value={inputValues.price} onChange={handleInputChange} />
        </div>

        {isPending ? (
          <CustomButton disabled type="button" name="Adding..." />
        ) : (
          <CustomButton type="submit" name="Add product" />
        )}
      </form>
    </div>
  );
};

export default AddProduct;
