// ASSETS
import { dropdownUpIcon } from "../../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { Fragment, useEffect, useRef } from "react";
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
    <div className="dropdown-account" ref={dropdownRef}>
      {getFavoriteList.length > 0 ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Fragment>
          <div className="dropdown-icon">{dropdownUpIcon}</div>
          <span className="dropdown-empty">There are no favorite products</span>
        </Fragment>
      )}
    </div>
  );
};

export default DropdownFavorites;
