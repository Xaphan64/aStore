// ASSETS

// STYLES

// LIBRARIES
import { useParams } from "react-router-dom";
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS

// CONFIGURATION
const ProductDetails = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { id } = useParams();

  // STATE CONSTANTS

  // LIFE CYCLE
  const { data: product, isLoading, error } = useFetch("http://localhost:8000/products/" + id);

  // EVENT HANDLERS
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {product && (
        <Fragment>
          <h2>{product.pName}</h2>

          <img src={product.pImage} alt="img not available" style={{ width: 200, height: 200 }} />
          <span>{product.pDescription}</span>
          <span>{product.price} RON</span>
        </Fragment>
      )}
    </div>
  );
};

export default ProductDetails;
