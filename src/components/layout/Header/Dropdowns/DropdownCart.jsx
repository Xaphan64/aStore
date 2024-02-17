// ASSETS
import { dropdownUpIcon } from "../../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../../../atoms/CustomButton";
import Cart from "../../../pages/Cart/Cart";

// CONFIGURATION
const DropdownCart = (props) => {
  // PROPERTIES
  const { setIsDropdownVisible, isHeader, getCartList } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  let dropdownRef = useRef();
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    let handler = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // EVENT HANDLERS
  return (
    <div className="dropdown-header cart" ref={dropdownRef}>
      {getCartList?.length > 0 ? (
        <Fragment>
          <div className="dropdown-icon">{dropdownUpIcon}</div>

          <div className="dropdown-options product">
            <span className="dropdown-title">Products in cart</span>

            <div className="dropdown-redirects products">
              <Cart isHeader={isHeader} />
            </div>

            <div className="dropdown-not-logged">
              <CustomButton type="button" name="Go to cart page" onClick={() => navigate("/cart")} />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="dropdown-empty cart">
            <div className="dropdown-icon">{dropdownUpIcon}</div>
            <span className="dropdown-empty-message">The cart is empty</span>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DropdownCart;
