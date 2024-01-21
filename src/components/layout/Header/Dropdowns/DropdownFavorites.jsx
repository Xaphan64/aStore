// ASSETS
import { dropdownUpIcon } from "../../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../../../atoms/CustomButton";

// CONFIGURATION
const DropdownFavorites = (props) => {
  // PROPERTIES
  const { setIsDropdownVisible } = props;

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
    <div className="dropdown-account" ref={dropdownRef}>
      <div className="dropdown-icon">{dropdownUpIcon}</div>

      <div className="dropdown-options">
        <span className="dropdown-title">Added products</span>

        <div className="dropdown-redirects">
          <span className="dropdown-buttons">favorite dropdown</span>
          <span className="dropdown-buttons">favorite dropdown</span>
          <span className="dropdown-buttons">favorite dropdown</span>
        </div>

        <div className="dropdown-not-logged">
          <CustomButton type="button" name="Go to favorite page" onClick={() => navigate("/favorites")} />
        </div>
      </div>
    </div>
  );
};

export default DropdownFavorites;
