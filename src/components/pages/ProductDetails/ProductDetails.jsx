// ASSETS

// STYLES

// LIBRARIES
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// MISC
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import CustomTextArea from "../../atoms/CustomTextArea";

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [editMode, setEditMode] = useState(false);
  const { inputValues, setForm, handleInputChange, handleImageChange } = useForm({
    id: id,
    name: "",
    description: "",
    image: "",
    price: "",
  });

  // LIFE CYCLE
  const { data: product, isLoading, error, setData } = useFetch(`http://localhost:8000/products/${id}`);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((response) => setForm(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, [editMode]);

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8000/products/${id}`, inputValues).then((response) => {
      console.log("product edited sucesfully", response);
      navigate(`/product/${product.id}`);
      setEditMode(false);
    });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this product?");

    if (confirm) {
      axios.delete("http://localhost:8000/products/" + id).then((response) => {
        console.log("Product deleted", response);
        navigate("/");
      });
    }
  };
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <div>
          {editMode ? (
            <div className="edit-products-container">
              <h1>Edit product</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <span>Product name:</span>
                  <CustomInput type="text" name="name" value={inputValues.name} onChange={handleInputChange} />
                </div>

                <div>
                  <span>Product description:</span>
                  <CustomTextArea
                    type="text"
                    name="description"
                    value={inputValues.description}
                    onChange={handleInputChange}
                  />
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
                <CustomButton type="button" name="Cancel" onClick={() => setEditMode(false)} />
              </form>
            </div>
          ) : (
            <div>
              <h2>{product.name}</h2>
              <div>
                <img src={product.image} alt="img not available" style={{ width: 500, height: 500 }} />
                <div>
                  <span>{product.price} RON</span>
                  <CustomButton type="button">Add to Cart</CustomButton>
                  <CustomButton type="button">Add to Favorites</CustomButton>
                </div>
              </div>
              <CustomButton type="button" onClick={() => setEditMode(true)}>
                Edit Product
              </CustomButton>
              <CustomButton type="button" onClick={() => handleDelete(product.id)}>
                Delete Product
              </CustomButton>
              <span>{product.description}</span>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
