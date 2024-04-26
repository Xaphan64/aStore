// ASSETS
import { dropdownUpIcon } from "../../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../../../atoms/CustomButton";
import Favorites from "../../../pages/Favorites/Favorites";

// CONFIGURATION
const DropdownFavorites = (props) => {
  // PROPERTIES
  const { setIsDropdownVisible, isHeader, getFavoriteList } = props;

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
    <div className="dropdown-header" ref={dropdownRef}>
      {getFavoriteList?.length > 0 ? (
        <div className="dropdown-header-favorite">
          <div className="dropdown-icon">{dropdownUpIcon}</div>

          <div className="dropdown-options product">
            <span className="dropdown-title">Added to favorite</span>

            <div className="dropdown-redirects products">
              <Favorites isHeader={isHeader} />
            </div>

            <div className="dropdown-not-logged">
              <CustomButton type="button" name="Go to favorite page" onClick={() => navigate("/favorites")} />
            </div>
          </div>
        </div>
      ) : (
        <div className="dropdown-empty favorite">
          <div className="dropdown-icon">{dropdownUpIcon}</div>
          <span className="dropdown-empty-message">There are no favorite products</span>
        </div>
      )}
    </div>
  );
};

export default DropdownFavorites;
