// ASSETS
import { dropdownUpIcon } from "../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { Link, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";

// CONFIGURATION
const DropdownAccount = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const account = localStorage.getItem("Username");
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("adminToken");
  };

  const user = sessionStorage.getItem("token");
  const admin = sessionStorage.getItem("adminToken");

  return (
    <div className="dropdown-account">
      <div className="dropdown-icon">{dropdownUpIcon}</div>

      {user || admin ? (
        <div className="dropdown-options">
          <span className="dropdown-title">Hello, {account}</span>

          <div className="dropdown-redirects">
            <span className="dropdown-buttons" onClick={() => navigate("/orders")}>
              My Orders
            </span>

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
