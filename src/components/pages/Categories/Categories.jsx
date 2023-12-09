// ASSETS

// STYLES

// LIBRARIES

// MISC
import ProductCard from "../../cards/ProductCard";
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/products/`);

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="categories-container">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading data...</h2>}

      {!isLoading && !error && (
        <div>
          {products?.map((product, index) => (
            <div key={`all-categories-${index}-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
