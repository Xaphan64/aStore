// ASSETS

import { Fragment } from "react";
import { useFetch } from "../../hooks/useFetch";
import CartCard from "../../cards/CartCard";

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

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
      {productsCart.length > 0 ? (
        <Fragment>
          {productsCart.map((product, index) => (
            <div className="favorite-map" key={`category-${index}-${product?.id}`}>
              <CartCard product={product} type={type} />
            </div>
          ))}
        </Fragment>
      ) : (
        <div className="favorite-message">The cart is empty</div>
      )}
    </Fragment>
  );
};

export default CartFilter;
