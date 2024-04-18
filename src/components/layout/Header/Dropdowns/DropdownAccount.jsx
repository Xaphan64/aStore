// ASSETS
import { dropdownUpIcon } from "../../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

// MISC

// COMPONENTS
import CustomButton from "../../../atoms/CustomButton";

// CONFIGURATION
const DropdownAccount = (props) => {
  // PROPERTIES
  const { setIsDropdownVisible } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const account = localStorage.getItem("Username");
  const user = sessionStorage.getItem("token");
  const admin = sessionStorage.getItem("adminToken");
  const navigate = useNavigate();
  let dropdownRef = useRef();

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

    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("adminToken");
  };

  return (
    <div className="dropdown-header account" ref={dropdownRef}>
      <div className="dropdown-icon">{dropdownUpIcon}</div>

      {user || admin ? (
        <div className="dropdown-options">
          <span className="dropdown-title">Hello, {account}</span>

          <div className="dropdown-redirects">
            <span className="dropdown-buttons" onClick={() => navigate("/favorites")}>
              My Favorites
            </span>

            <span className="dropdown-buttons" onClick={() => navigate("/cart")}>
              My Cart
            </span>

            {admin && (
              <span className="dropdown-buttons" onClick={() => navigate("/add-product")}>
                Add Product
              </span>
            )}
          </div>

          <span onClick={handleLogout} className="dropdown-logout">
            Logout
          </span>
        </div>
      ) : (
        <div className="dropdown-not-logged">
          <CustomButton type="button" name="Sign in" onClick={() => navigate("/login")} />

          <div className="dropdown-not-logged-register">
            <span>New customer?</span>

            <Link to="/register" className="link">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropdownAccount;
