// ASSETS

// STYLES

// LIBRARIES

// MISC
import ProductCard from "../../cards/ProductCard";
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS

// CONFIGURATION
const Favorites = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: phones } = useFetch(`http://localhost:8000/phones`);

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="favorite-container">
      <h2>My favorites</h2>
      {phones.length > 0 && (
        <div className="main-page-category">
          {phones
            .filter((product) => product.favorite === true)
            .map((product, index) => (
              <div className="main-page-category-map" key={`gaming-${index}-${product?.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
