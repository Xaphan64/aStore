// ASSETS

// STYLES

// LIBRARIES
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState("viewMode"); // viewMode, createMode, editMode

  // STATE CONSTANTS

  // LIFE CYCLE
  const { data: product, isLoading, error } = useFetch("http://localhost:8000/products/" + id);

  // EVENT HANDLERS
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
      {product && !isLoading && !error && (
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

          <CustomButton type="button" onClick={() => navigate(`/edit-product/${product.id}`)}>
            {/* <CustomButton type="button" onClick={() => navigate(`/manage-product/${product.id}`)}> */}
            Edit Product
          </CustomButton>

          <CustomButton type="button" onClick={() => handleDelete(product.id)}>
            Delete Product
          </CustomButton>

          <span>{product.description}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
