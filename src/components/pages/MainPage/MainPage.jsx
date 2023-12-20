// ASSETS
import beachImage from "../../assets/carousel/beachImage.jpg";
import forestImage from "../../assets/carousel/forestImage.jpg";
import mountainImage from "../../assets/carousel/mountainImage.jpg";

// STYLES
import "./MainPage.scss";

// LIBRARIES
// import { useLocation, useParams } from "react-router-dom";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";
import ImageSlider from "./AdsContainer";

// CONFIGURATION
const MainPage = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  // const { id } = useParams();
  // const { state } = useLocation();
  const slides = [
    { url: beachImage, title: "Beach" },
    { url: forestImage, title: "Forest" },
    { url: mountainImage, title: "Mountain" },
  ];

  // API REQUESTS
  const { data: phones, isLoading, error } = useFetch(`http://localhost:8000/phones`);
  const { data: laptops } = useFetch(`http://localhost:8000/laptops`);
  const { data: tv } = useFetch(`http://localhost:8000/tv`);
  const { data: gaming } = useFetch(`http://localhost:8000/gaming`);
  const { data: books } = useFetch(`http://localhost:8000/books`);
  const { data: food } = useFetch(`http://localhost:8000/food`);
  const { data: toys } = useFetch(`http://localhost:8000/toys`);
  const { data: furniture } = useFetch(`http://localhost:8000/furniture`);

  // const { data: products, isLoading, error } = useFetch(`http://localhost:8000/${state?.currentCategory}/${id}`);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="main-page-container">
      <div className="ads-container">
        <ImageSlider slides={slides} />
      </div>

      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading data...</h2>}

      {!isLoading && !error && (
        <div className="main-page-categories">
          {phones.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Phones</h2>
              {phones?.map((product, index) => (
                <div className="main-page-category-map" key={`phones-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {laptops.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Laptops</h2>
              {laptops?.map((product, index) => (
                <div className="main-page-category-map" key={`laptops-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {tv.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">TV</h2>
              {tv?.map((product, index) => (
                <div className="main-page-category-map" key={`tv-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {gaming.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Gaming</h2>
              {gaming?.map((product, index) => (
                <div className="main-page-category-map" key={`gaming-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {books.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Books</h2>
              {books?.map((product, index) => (
                <div className="main-page-category-map" key={`books-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {food.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Food</h2>
              {food?.map((product, index) => (
                <div className="main-page-category-map" key={`food-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {toys.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Toys</h2>
              {toys?.map((product, index) => (
                <div className="main-page-category-map" key={`toys-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {furniture.length > 0 && (
            <div className="main-page-category">
              <h2 className="main-page-category-title">Furniture</h2>
              {furniture?.map((product, index) => (
                <div className="main-page-category-map" key={`furniture-${index}-${product?.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
