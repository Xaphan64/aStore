// ASSETS
import beachImage from "../../assets/carousel/beachImage.jpg";
import forestImage from "../../assets/carousel/forestImage.jpg";
import mountainImage from "../../assets/carousel/mountainImage.jpg";

// STYLES
import "./MainPage.scss";

// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ImageSlider from "./AdsContainer";
import MainPageCategories from "./MainPageCategories";

// CONFIGURATION
const MainPage = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  const slides = [
    { url: beachImage, title: "Beach" },
    { url: forestImage, title: "Forest" },
    { url: mountainImage, title: "Mountain" },
  ];

  const products = [
    { type: "phones" },
    { type: "laptops" },
    { type: "tv" },
    { type: "gaming" },
    { type: "books" },
    { type: "food" },
    { type: "toys" },
    { type: "furniture" },
  ];

  // API REQUESTS
  const { isLoading, error } = useFetch(`http://localhost:8000`);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="main-page-container">
      <div className="ads-container">
        <ImageSlider slides={slides} />
      </div>

      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <div className="main-page-categories-container">
          {products?.map((product, index) => (
            <MainPageCategories type={product.type} key={`category-${index}-${product?.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
