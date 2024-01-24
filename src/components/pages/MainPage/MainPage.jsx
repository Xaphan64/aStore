// ASSETS
import beachImage from "../../assets/carousel/beachImage.jpg";
import forestImage from "../../assets/carousel/forestImage.jpg";
import mountainImage from "../../assets/carousel/mountainImage.jpg";

// STYLES
import "./MainPage.scss";

// LIBRARIES
import { useRef } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ImageSlider from "./AdsContainer";
import MainPageCategories from "./MainPageCategories";
import Snackbar from "../../atoms/Snackbar/Snackbar";

// CONFIGURATION
const MainPage = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  const slides = [
    { url: beachImage, title: "Beach" },
    { url: forestImage, title: "Forest" },
    { url: mountainImage, title: "Mountain" },
  ];

  const categories = [
    { type: "phones" },
    { type: "laptops" },
    { type: "tv" },
    { type: "gaming" },
    { type: "books" },
    { type: "food" },
    { type: "toys" },
    { type: "furniture" },
  ];

  const snackbarType = {
    addFavorite: "addFavorite",
    removeFavorite: "removeFavorite",
    addCart: "addCart",
  };

  const snackbarRefAdd = useRef(null);
  const snackbarRefRemove = useRef(null);
  const snackbarRefCart = useRef(null);

  // API REQUESTS
  const { isLoading, error, setIsRerendering } = useFetch(`http://localhost:8000`);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const showAddFavorite = () => {
    snackbarRefAdd.current.show();
  };

  const showRemoveFavorite = () => {
    snackbarRefRemove.current.show();
  };

  const showaddCart = () => {
    snackbarRefCart.current.show();
  };

  return (
    <div className="main-page-container">
      <Snackbar message="Product added to favorites" ref={snackbarRefAdd} type={snackbarType.addFavorite} />

      <Snackbar message="Product removed from favorites" ref={snackbarRefRemove} type={snackbarType.removeFavorite} />

      <Snackbar message="Product added to cart" ref={snackbarRefCart} type={snackbarType.addCart} />

      <div className="ads-container">
        <ImageSlider slides={slides} />
      </div>

      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <div className="main-page-categories-container">
          {categories?.map((product, index) => (
            <MainPageCategories
              type={product.type}
              key={`category-${index}-${product?.id}`}
              showAddFavorite={showAddFavorite}
              showRemoveFavorite={showRemoveFavorite}
              showaddCart={showaddCart}
              setIsRerendering={setIsRerendering}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
