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
import { useFetch } from "../../hooks/useFetch";

// CONFIGURATION
const EditProduct = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product } = useFetch(`https://blog-data-9hab.onrender.com/products/${id}`);

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
      .get(`https://blog-data-9hab.onrender.com/products/${id}`)
      .then((response) => setForm(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://blog-data-9hab.onrender.com/${id}`, inputValues).then(() => {
      navigate(`/product/${product.id}`);
    });
  };

  return (
    <div className="edit-products-container">
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
          <img src={inputValues.image} alt="Selected" style={{ width: 500, height: 500 }} />
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
