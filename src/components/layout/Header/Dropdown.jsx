// ASSETS
import { dropdownUpIcon } from "../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

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
  };

  return (
    <div className="dropdown-account">
      <div className="dropdown-icon">{dropdownUpIcon}</div>

      <div className="dropdown-options">
        <span className="dropdown-title">Hello, {account}</span>

        <div className="dropdown-redirects">
          <span className="dropdown-buttons" onClick={() => navigate("/orders")}>
            My Orders
          </span>

          <span className="dropdown-buttons" onClick={() => navigate("/favorites")}>
            My Favorites
          </span>

          <span className="dropdown-buttons" onClick={() => navigate("/add-product")}>
            Add Product
          </span>
        </div>

        <span onClick={handleLogout} className="dropdown-logout">
          Logout
        </span>
      </div>
    </div>
  );
};
export default DropdownAccount;
