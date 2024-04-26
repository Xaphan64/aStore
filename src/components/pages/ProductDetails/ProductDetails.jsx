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
import Snackbar from "../../atoms/Snackbar/Snackbar";

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileInput = useRef(null);
  const admin = sessionStorage.getItem("adminToken");

  const snackbarType = {
    addFavorite: "addFavorite",
    removeFavorite: "removeFavorite",
    addCart: "addCart",
    alreadyCart: "alreadyCart",
  };

  const snackbarRefAdd = useRef(null);
  const snackbarRefRemove = useRef(null);
  const snackbarRefCart = useRef(null);
  const snackbarRefAlready = useRef(null);

  // STATE CONSTANTS
  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [modal, setModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descError, setDescError] = useState("");
  const { inputValues, setForm, handleInputChange, handleImageChange } = useForm({
    id: id,
    name: "",
    description: "",
    image: "",
    price: "",
  });

  // LIFE CYCLE
  const {
    data: product,
    isLoading,
    error,
    setData,
    setIsRerendering,
  } = useFetch(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`);

  const [addFavorite, setAddFavorite] = useState(product?.favorite || false);

  //useEffect to get the input data when pressing the edit
  useEffect(() => {
    axios
      .get(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`)
      .then((response) => {
        setForm(response.data);

        setAddFavorite(response.data.favorite);
      })
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, []);

  //useEffect for not having to refresh the page after edit
  useEffect(() => {
    axios
      .get(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));

    // eslint-disable-next-line
  }, [editMode]);

  // EVENT HANDLERS
  const handleFavorite = (favStatus) => {
    setAddFavorite(favStatus);

    //change the favorite status of the inputValues
    const updatedFavorite = {
      ...inputValues,
      favorite: favStatus,
    };

    const type = state?.currentCategory;

    //get data from localStorage
    const getFavoriteList = JSON.parse(localStorage?.getItem("favoriteList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfFavoriteItems = getFavoriteList?.length > 0 ? getFavoriteList : [];

    let localFavoriteList = [...listOfFavoriteItems];

    axios
      .put(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`, updatedFavorite)
      .then((response) => {
        if (favStatus) {
          //add id and type in localFavorite list
          localFavoriteList.push({
            id: inputValues.id,
            type: inputValues.type,
          });

          //save id and type in localStorage
          localStorage.setItem("favoriteList", JSON.stringify(localFavoriteList));

          setIsRerendering(response?.data);
          setIsRerendering(response?.data?.favorite);
          setIsRerendering(response?.data?.cart);
          setForm(response.data);

          showAddFavorite();
        } else {
          // if list and length is not 0 delete the product with the same id and type
          if (getFavoriteList && getFavoriteList?.length > 0) {
            const updatedFavoriteList = getFavoriteList?.filter((product) => {
              return !(product.id === id && product.type === type);
            });

            //update the data in localStorage
            localStorage.setItem("favoriteList", JSON.stringify(updatedFavoriteList));
          }

          setIsRerendering(response?.data);
          setIsRerendering(response?.data?.favorite);
          setIsRerendering(response?.data?.cart);
          setForm(response.data);

          showRemoveFavorite();
        }
      })
      .catch((error) => {
        console.error("Error updating favorite status", error);
      });
  };

  const handleAddCart = () => {
    //change the cart status of the product
    const addToCart = {
      ...inputValues,
      cart: true,
    };

    //get data from localStorage
    const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

    //if the localStorage is populated get the data otherwise create an empty array
    const listOfCartItems = getProductsList?.length > 0 ? getProductsList : [];

    let localCartList = [...listOfCartItems];

    axios
      .put(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`, addToCart)
      .then((response) => {
        //if cart list is empty, push name, id, type and price in localCartList
        if (localCartList.length === 0) {
          localCartList.push({
            name: product.name,
            price: product.price,
            id: product.id,
            type: product.type,
          });

          showaddCart();
        } else {
          const productExist = listOfCartItems.some((item) => item.id === product.id && item.type === product.type);

          //if id and type are not the same, push localCartList
          if (!productExist) {
            localCartList.push({
              name: product.name,
              price: product.price,
              id: product.id,
              type: product.type,
            });

            showaddCart();
          } else {
            showAlreadyCart();
          }
        }

        //save data in localStorage
        localStorage.setItem("cartProductsList", JSON.stringify(localCartList));

        setIsRerendering(response?.data);
        setIsRerendering(response?.data?.favorite);
        setIsRerendering(response?.data?.cart);
        setForm(response.data);

        showaddCart();
      })
      .catch((error) => {
        console.error("Error, could not add to cart", error);
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
      axios.put(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`, inputValues).then((response) => {
        setIsPending(false);
        setEditMode(false);
      });
    }
  };

  const handleDelete = (id) => {
    setIsPending(true);

    axios.delete(`https://blog-data-9hab.onrender.com/${state?.currentCategory}/${id}`).then(() => {
      navigate("/");
      setIsPending(false);
    });
  };

  const priceFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const showAddFavorite = () => {
    snackbarRefAdd.current.show();
  };

  const showRemoveFavorite = () => {
    snackbarRefRemove.current.show();
  };

  const showaddCart = () => {
    snackbarRefCart.current.show();
  };

  const showAlreadyCart = () => {
    snackbarRefAlready.current.show();
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
              <Snackbar message="Product added to favorites" ref={snackbarRefAdd} type={snackbarType.addFavorite} />

              <Snackbar
                message="Product removed from favorites"
                ref={snackbarRefRemove}
                type={snackbarType.removeFavorite}
              />

              <Snackbar message="Product added to cart" ref={snackbarRefCart} type={snackbarType.addCart} />

              <Snackbar
                message="Product already exists in cart"
                ref={snackbarRefAlready}
                type={snackbarType.alreadyCart}
              />
              <div className="product-details-items">
                <h2>{product.name}</h2>
                <div className="product-details-body">
                  <img src={product.image} alt="img not available" />
                  <div className="product-details-buttons">
                    <span className="product-details-price">{priceFormat(product.price)} Lei</span>

                    <CustomButton type="button" onClick={handleAddCart}>
                      <div>{cartFilledIcon}</div>
                      <span>Add to cart</span>
                    </CustomButton>

                    {addFavorite ? (
                      <CustomButton
                        type="button"
                        className="button-favorites added"
                        onClick={() => handleFavorite(false)}
                      >
                        <div>{favoriteAddedIcon}</div>
                        <span>Added to favorites</span>
                      </CustomButton>
                    ) : (
                      <CustomButton type="button" className="button-favorites" onClick={() => handleFavorite(true)}>
                        <div>{favoriteIcon}</div>
                        <span>Add to favorites</span>
                      </CustomButton>
                    )}

                    {admin && (
                      <CustomButton type="button" onClick={() => setEditMode(true)}>
                        <div>{editIcon}</div>
                        <span>Edit Product</span>
                      </CustomButton>
                    )}

                    {admin && (
                      <CustomButton type="button" className="button-red" onClick={() => setModal(true)}>
                        <div>{deleteIcon}</div>
                        <span>Delete Product</span>
                      </CustomButton>
                    )}
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
