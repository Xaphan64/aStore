// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import CartCard from "../../cards/CartCard";

// CONFIGURATION
const CartFilter = (props) => {
  // PROPERTIES
  const { type = "" } = props;

  // API REQUESTS
  const { data: products } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  const productsCart = products.filter((product) => product.cart === true);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <Fragment>
      {productsCart.length > 0 && (
        <Fragment>
          {productsCart.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              <CartCard product={product} type={type} />
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartFilter;
