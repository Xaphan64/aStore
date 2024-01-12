// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// MISC
import { useForm } from "../../hooks/useForm";
import { productType } from "../../config/productOptions";
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomTextArea from "../../atoms/CustomTextArea";
import CustomInput from "../../atoms/CustomInput";
import CustomDropdown from "../../atoms/CustomDropdown";

// CONFIGURATION
const ManageProduct = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product } = useFetch(`http://localhost:8000/products/${id}`);
  // STATE CONSTANTS
  const [editMode, setEditMode] = useState(false);
  const { inputValues, handleInputChange, handleImageChange } = useForm({
    id: id,
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const addProduct = () => {
    axios.post("http://localhost:8000/products", inputValues).then((response) => {
      console.log("product added sucesfully", response);
      navigate("/");

      //   navigate("/product/add-product");
      //   navigate("/product/"+ id);

      setEditMode(false);
      console.log("add product function ran");
    });
  };

  const editProduct = () => {
    axios.put(`http://localhost:8000/products/${id}`, inputValues).then((response) => {
      console.log("product edited sucesfully", response);
      navigate(`/product/${product.id}`);
      setEditMode(true);
      console.log("edit product function ran");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    editMode ? editProduct() : addProduct();
  };

  return (
    <div className="manage-product-container">
      <h1>{editMode ? "Edit" : "Add a new"} product</h1>

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
          <span>Product type:</span>
          <CustomDropdown name="type" value={inputValues.type} onChange={handleInputChange} options={productType} />
        </div>

        <div>
          <span>Product price:</span>
          <CustomInput type="text" name="price" value={inputValues.price} onChange={handleInputChange} />
        </div>

        <CustomButton type="submit" name={editMode ? "Edit product" : "Add product"} />
      </form>
    </div>
  );
};

export default ManageProduct;
