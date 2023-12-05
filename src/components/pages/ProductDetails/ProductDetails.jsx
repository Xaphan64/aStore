// ASSETS
import Placeholder from "./../../assets/Placeholder.png";

// STYLES

// LIBRARIES
<<<<<<< Updated upstream
import { useParams } from "react-router-dom";
import { Fragment } from "react";
=======
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
>>>>>>> Stashed changes

// MISC
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { productType } from "../../config/productOptions";

// COMPONENTS
<<<<<<< Updated upstream
=======
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import CustomTextArea from "../../atoms/CustomTextArea";
import CustomDropdown from "../../atoms/CustomDropdown";
>>>>>>> Stashed changes

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
  const location = useLocation();
>>>>>>> Stashed changes

  // STATE CONSTANTS
  const [isPending, setIsPending] = useState(false);
  const [currentMode, setCurrentMode] = useState("viewMode");
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

    localStorage.setItem("currentMode", "viewMode");
    setCurrentMode("viewMode");

    TODO: console.log("1st useEffect currentMode :>> ", localStorage.setItem("currentMode", "viewMode"));
    console.log("1st useEffect currentMode in SET :>> ", currentMode);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

    if (currentPage === "add-product") {
      setCurrentMode("createMode");
      setForm({
        name: "",
        description: "",
        image: "",
        type: "",
        price: "",
      });
    }

    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, [currentMode]);

  // EVENT HANDLERS
<<<<<<< Updated upstream
=======
  const handleSetMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("currentMode", mode);

    TODO: console.log("currentMode in handleSetMode :>> ", localStorage.setItem("currentMode", mode));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    if (localStorage.getItem("currentMode") === "editMode") {
      axios.put(`http://localhost:8000/products/${id}`, inputValues).then((response) => {
        console.log("product edited sucesfully", response);
        handleSetMode("viewMode");
        setIsPending(false);
      });
    }

    if (localStorage.getItem("currentMode") === "createMode") {
      axios.post("http://localhost:8000/products", inputValues).then((response) => {
        console.log("product added sucesfully", response);
        setIsPending(false);
        navigate("/");
        handleSetMode("createMode");
      });
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this product?");

    setIsPending(true);

    if (confirm) {
      axios.delete(`http://localhost:8000/products/${id}`).then((response) => {
        console.log("Product deleted", response);
        navigate("/");
        setIsPending(false);
      });
    }
  };

  console.log("currentMode in ProductDetails :>> ", currentMode);

>>>>>>> Stashed changes
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
<<<<<<< Updated upstream
      {product && (
        <Fragment>
          <h2>{product.pName}</h2>

          <img src={product.pImage} alt="img not available" style={{ width: 200, height: 200 }} />
          <span>{product.pDescription}</span>
          <span>{product.price} RON</span>
        </Fragment>
=======

      {!isLoading && !error && (
        <div>
          {currentMode === "viewMode" && (
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

              {isPending ? (
                <CustomButton disabled type="button" name="Deleting..." />
              ) : (
                <div>
                  <CustomButton type="button" name="Edit Product" onClick={() => handleSetMode("editMode")} />

                  <CustomButton type="button" name="Delete Product" onClick={() => handleDelete(product.id)} />
                </div>
              )}

              <span>{product.description}</span>
            </div>
          )}

          {currentMode === "editMode" && (
            <div className="add-edit-products-container">
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

                {isPending ? (
                  <CustomButton disabled type="button" name="Editing..." />
                ) : (
                  <div>
                    <CustomButton type="submit" name="Edit product" />
                    <CustomButton type="button" name="Cancel" onClick={() => handleSetMode("viewMode")} />
                  </div>
                )}
              </form>
            </div>
          )}

          {currentMode === "createMode" && (
            <div>
              <h1>Add a new product</h1>

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
                  {inputValues.image ? (
                    <img src={inputValues.image} alt="Selected" style={{ width: 500, height: 500 }} />
                  ) : (
                    <img src={Placeholder} alt="Placeholder" style={{ width: 500, height: 500 }} />
                  )}

                  <CustomInput type="file" name="image" onChange={handleImageChange} />
                </div>

                <div>
                  <span>Product type:</span>
                  <CustomDropdown
                    name="type"
                    value={inputValues.type}
                    onChange={handleInputChange}
                    options={productType}
                  />
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
          )}
        </div>
>>>>>>> Stashed changes
      )}
    </div>
  );
};

export default ProductDetails;
