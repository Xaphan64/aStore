// ASSETS
import { warningIcon, cartFilledIcon, favoriteIcon, favoriteAddedIcon } from "../../assets/MUI-icons";
import { editIcon, deleteIcon } from "../../assets/MUI-icons";

// STYLES
import "../AddProduct/Product.scss";

// LIBRARIES
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";

// MISC
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import CustomTextArea from "../../atoms/CustomTextArea";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileInput = useRef(null);

  // STATE CONSTANTS
  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [modal, setModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descError, setDescError] = useState("");
  const [addFavorite, setAddFavorite] = useState(false);
  const { inputValues, setForm, handleInputChange, handleImageChange } = useForm({
    id: id,
    name: "",
    description: "",
    image: "",
    price: "",
    // favorite: false,
  });

  // LIFE CYCLE
  const {
    data: product,
    isLoading,
    error,
    setData,
  } = useFetch(`http://localhost:8000/${state?.currentCategory}/${id}`);

  //useEffect to get the input data when pressing the edit
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${state?.currentCategory}/${id}`)
      .then((response) => setForm(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  //useEffect for not having to refresh the page after edit
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${state?.currentCategory}/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, [editMode]);

  // EVENT HANDLERS
  const handleAddFavorite = () => {
    setAddFavorite(!addFavorite);

    const addedToFavorite = {
      ...inputValues,
      favorite: true,
    };

    axios
      .put(`http://localhost:8000/${state?.currentCategory}/${id}`, addedToFavorite)
      .then((response) => {
        console.log("Added to favorite", response);
      })
      .catch((error) => {
        console.error("Error, could not add to favorite", error);
      });

    console.log("Add to favorite clicked");
  };

  const handleRemoveFavorite = () => {
    setAddFavorite(!addFavorite);

    const removeFromFavorite = {
      ...inputValues,
      favorite: false,
    };

    axios
      .put(`http://localhost:8000/${state?.currentCategory}/${id}`, removeFromFavorite)
      .then((response) => {
        console.log("Removed from favorite", response);
      })
      .catch((error) => {
        console.error("Error, could not remove from favorite", error);
      });

    console.log("Remove from favorite clicked");
  };

  const handleFavorite = () => {
    setAddFavorite(!addFavorite);

    const updatedFavorite = {
      ...inputValues,
      favorite: !addFavorite,
    };

    axios
      .put(`http://localhost:8000/${state?.currentCategory}/${id}`, updatedFavorite)
      .then((response) => {
        if (addFavorite) {
          console.log("Removed from favorites", response);
        } else {
          console.log("Added to favorites", response);
        }
      })
      .catch((error) => {
        console.error("Error updating favorite status", error);
      });
  };

  const handleImageClick = () => {
    fileInput.current.click();
  };

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

    //if conditions are met edit the product
    if (inputValues.name.trim() !== "" && priceRegex.test(inputValues.price) && inputValues.description.trim() !== "") {
      axios.put(`http://localhost:8000/${state?.currentCategory}/${id}`, inputValues).then((response) => {
        console.log("product edited sucesfully", response);
        // navigate(`/product/${product.id}`);
        setIsPending(false);
        setEditMode(false);
      });
    }
  };

  const handleDelete = (id) => {
    setIsPending(true);

    axios.delete(`http://localhost:8000/${state?.currentCategory}/${id}`).then((response) => {
      console.log("Product deleted", response);
      navigate("/");
      setIsPending(false);
    });
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <Fragment>
      {isLoading && <div className="api-error">Loading...</div>}
      {error && <div className="api-error">{error}</div>}
      {!isLoading && !error && (
        <Fragment>
          {editMode ? (
            <div className="product-container">
              <h1>Edit product</h1>

              <form onSubmit={handleSubmit}>
                <div className={nameError ? "product-fields red" : "product-fields"}>
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={inputValues.name}
                    onChange={handleInputChange}
                  />

                  {nameError && (
                    <div className="product-fields-error">
                      {warningIcon} {nameError}
                    </div>
                  )}
                </div>

                <div className="product-fields">
                  <span>Click on the image if you want to change it</span>
                  <img src={inputValues.image} alt="Selected" onClick={handleImageClick} />
                  <input
                    className="image-input"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={fileInput}
                  />
                </div>

                <div className={priceError ? "product-fields red" : "product-fields"}>
                  <CustomInput
                    type="text"
                    name="price"
                    placeholder="Product price"
                    value={inputValues.price}
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
                    placeholder="Product details"
                    value={inputValues.description}
                    onChange={handleInputChange}
                  />

                  {descError && (
                    <div className="product-fields-error">
                      {warningIcon} {descError}
                    </div>
                  )}
                </div>

                {isPending ? (
                  <CustomButton disabled type="button" name="Editing..." />
                ) : (
                  <Fragment>
                    <CustomButton type="submit" name="Edit product" />

                    <CustomButton
                      type="button"
                      name="Cancel"
                      className="button-red"
                      onClick={() => setEditMode(false)}
                    />
                  </Fragment>
                )}
              </form>
            </div>
          ) : (
            <div className="product-details-container">
              <div className="product-details-items">
                <h2>{product.name}</h2>
                <div className="product-details-body">
                  <img src={product.image} alt="img not available" />
                  <div className="product-details-buttons">
                    <span className="product-details-price">{priceFormat(product.price)} Lei</span>

                    <CustomButton type="button">
                      <div>{cartFilledIcon}</div>
                      <span>Add to cart</span>
                    </CustomButton>

                    {addFavorite ? (
                      <CustomButton type="button" className="button-favorites added" onClick={handleFavorite}>
                        <div>{favoriteAddedIcon}</div>
                        <span>Added to favorites</span>
                      </CustomButton>
                    ) : (
                      <CustomButton type="button" className="button-favorites" onClick={handleFavorite}>
                        <div>{favoriteIcon}</div>
                        <span>Add to favorites</span>
                      </CustomButton>
                    )}

                    <CustomButton type="button" onClick={() => setEditMode(true)}>
                      <div>{editIcon}</div>
                      <span>Edit Product</span>
                    </CustomButton>

                    <CustomButton type="button" className="button-red" onClick={() => setModal(true)}>
                      <div>{deleteIcon}</div>
                      <span>Delete Product</span>
                    </CustomButton>
                  </div>
                </div>
                <div className="product-details-description">
                  <h3>Description:</h3>
                  <span>{product.description}</span>
                </div>
              </div>

              {modal && (
                <ConfirmationModal
                  handleDelete={handleDelete}
                  setModal={setModal}
                  product={product}
                  isPending={isPending}
                />
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
