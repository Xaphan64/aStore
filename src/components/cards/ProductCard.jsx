// ASSETS

// STYLES

// LIBRARIES
import { Fragment } from "react";
import propTypes from "prop-types";

// MISC

// COMPONENTS
import CustomButton from "../atoms/CustomButton";
import { Link } from "react-router-dom";

// CONFIGURATION
const ProductCard = (props) => {
  // PROPERTIES
  const { deleteProduct, products } = props;
  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="product-card-container" style={{ display: "flex", flexDirection: "column" }}>
      {products?.map((product, index) => (
        <Fragment key={`${index}-${product?.id}`}>
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
          >
            <span>{product.pName}</span>
            {/* <span>{product.pDescription}</span> */}
            <img src={product.pImage} alt="N/a" style={{ width: 20, height: 20 }} />
            <span>{product.price} RON</span>
          </Link>
          <CustomButton type="button" name="Delete product" onClick={() => deleteProduct(product.id)} />
        </Fragment>
      ))}
    </div>
  );
};

ProductCard.propsTypes = {
  deleteProduct: propTypes.func.isRequired,
  products: propTypes.array,
};

export default ProductCard;
