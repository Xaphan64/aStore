// ASSETS

// STYLES
import "./../Favorites/Favorites.scss";

// LIBRARIES
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import CartFilter from "./CartFilter";
import CustomButton from "../../atoms/CustomButton";

// CONFIGURATION
const Cart = (props) => {
  // PROPERTIES
  const { isHeader } = props;

  // API REQUESTS

  const { isLoading, error } = useFetch(`http://localhost:8000`);

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  const user = sessionStorage.getItem("token");
  const admin = sessionStorage.getItem("adminToken");

  const category = [
    { type: "phones" },
    { type: "laptops" },
    { type: "tv" },
    { type: "gaming" },
    { type: "books" },
    { type: "food" },
    { type: "toys" },
    { type: "furniture" },
  ];

  // STATE CONSTANTS
  const [cartProductList, setCartProductList] = useState(JSON.parse(localStorage?.getItem("cartProductsList")));

  const priceFormat = () => {
    const totalPrice = cartProductList?.reduce((accumulator, product) => accumulator + parseFloat(product.price), 0);

    return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="favorite-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading cart...</h2>}

      {!isLoading && !error && (
        <Fragment>
          {!isHeader && <h1 className="favorite-title">My Cart</h1>}

          <div className="favorite-category">
            {category?.map((product, index) => (
              <CartFilter
                type={product.type}
                key={`category-${index}-${product.id}`}
                setCartProductList={setCartProductList}
                isHeader={isHeader}
              />
            ))}

            {!cartProductList || cartProductList?.length === 0 ? (
              <div className="favorite-message">
                There are no products in cart. If you want to add products go to{" "}
                <Link to="/" className="link">
                  main page
                </Link>
              </div>
            ) : (
              <Fragment>
                <div className={isHeader ? "dropdown-cart-footer" : "cart-footer-containter"}>
                  <div className="cart-total-price">
                    <span className="cart-text">
                      Total:
                      {isHeader && (
                        <span className="dropdown-cart-length">
                          {cartProductList?.length} {cartProductList?.length === 1 ? "product" : "products"}
                        </span>
                      )}
                    </span>

                    <span className="cart-price">{priceFormat()} Lei</span>
                  </div>

                  {!isHeader && (
                    <CustomButton
                      name="Next"
                      type="button"
                      onClick={user || admin ? () => navigate("/checkout") : () => navigate("/login")}
                    />
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
