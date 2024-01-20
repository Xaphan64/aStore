// ASSETS

// STYLES
import { cartFilledIcon, favoriteAddedIcon, favoriteIcon } from "../../assets/MUI-icons";
import "./Snackbar.scss";

// LIBRARIES
import { useState, forwardRef, useImperativeHandle } from "react";

// MISC

// COMPONENTS

// CONFIGURATION
const Snackbar = forwardRef((props, ref) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [showSnackbar, setShowSnackbar] = useState(false);
  // LIFE CYCLE

  // EVENT HANDLERS
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));

  return (
    <div className={showSnackbar ? "snackbar show" : "snackbar hide"}>
      <div className="symbol">
        {props.type === "addFavorite" && <div className="add-favorite">{favoriteAddedIcon}</div>}
        {props.type === "removeFavorite" && <div className="remove-favorite">{favoriteIcon}</div>}
        {props.type === "addCart" && <div className="add-cart">{cartFilledIcon}</div>}
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
});

export default Snackbar;
