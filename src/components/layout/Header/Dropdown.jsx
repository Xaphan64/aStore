// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION

// PROPERTIES

// API REQUESTS

// LIBRARY CONSTANTS
const account = localStorage.getItem("Username");
// const navigate = useNavigate();

// STATE CONSTANTS

// LIFE CYCLE

// EVENT HANDLERS
export const DropdownAccount = () => {
  return (
    <div className="dropdown-account">
      <span>Hello, {account}</span>

      <ul>
        <li
        // onClick={() => navigate("/orders")}
        >
          My Orders
        </li>
        <li
        // onClick={() => navigate("/favorites")}
        >
          My Favorites
        </li>
        <li
        // onClick={() => navigate("/add-products")}
        >
          Add Products
        </li>
      </ul>

      <span>Logout</span>
    </div>
  );
};
