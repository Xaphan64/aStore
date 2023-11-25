// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// MISC
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import CustomTextArea from "../../atoms/CustomTextArea";
import { useEffect } from "react";

// CONFIGURATION
const EditProduct = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const { id } = useParams();

  // STATE CONSTANTS
  const { inputValues, setForm, handleInputChange, handleImageChange } = useForm({
    id: id,
    name: "",
    description: "",
    image: "",
    price: "",
  });

  // LIFE CYCLE
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/" + id)
      .then((response) => setForm(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put("http://localhost:8000/products/" + id, inputValues).then((response) => {
      console.log("product edited sucesfully", response);
      navigate("/");
    });
  };

  return (
    <div className="add-edit-products-container">
      <h1>Edit product</h1>

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
          <CustomInput type="file" name="image" onChange={handleImageChange} />
        </div>

        <div>
          <span>Product price:</span>
          <CustomInput type="text" name="price" value={inputValues.price} onChange={handleInputChange} />
        </div>

        <CustomButton type="submit" name="Edit product" />
      </form>
    </div>
  );
};

export default EditProduct;
