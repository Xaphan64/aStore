// ASSETS

// STYLES

// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";

// CONFIGURATION
const MainPage = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/products/`);

  // LIBRARY CONSTANTS
  const phones = products?.filter((product) => product.type === "Phones");
  const laptops = products?.filter((product) => product.type === "Laptops");
  const tv = products?.filter((product) => product.type === "TV");
  const gaming = products?.filter((product) => product.type === "Gaming");
  const books = products?.filter((product) => product.type === "Books");
  const food = products?.filter((product) => product.type === "Food");
  const toys = products?.filter((product) => product.type === "Toys");
  const furniture = products?.filter((product) => product.type === "Furniture");

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="main-page-container">
      <div className="ads-container">
        <h1>Three carousel ads will be here with timer to change the ad</h1>
      </div>

      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading data...</h2>}

      {!isLoading && !error && (
        <div className="main-page-categories">
          <div className="main-page-category">
            <h2 className="main-page-category-title">Phones</h2>
            {phones?.map((product, index) => (
              <div className="main-page-category-map" key={`phones-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Laptops</h2>
            {laptops?.map((product, index) => (
              <div className="main-page-category-map" key={`laptops-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">TV</h2>
            {tv?.map((product, index) => (
              <div className="main-page-category-map" key={`tv-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Gaming</h2>
            {gaming?.map((product, index) => (
              <div className="main-page-category-map" key={`gaming-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Books</h2>
            {books?.map((product, index) => (
              <div className="main-page-category-map" key={`books-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Food</h2>
            {food?.map((product, index) => (
              <div className="main-page-category-map" key={`food-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Toys</h2>
            {toys?.map((product, index) => (
              <div className="main-page-category-map" key={`toys-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="main-page-categories">
            <h2 className="main-page-category-title">Furniture</h2>
            {furniture?.map((product, index) => (
              <div className="main-page-category-map" key={`furniture-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
