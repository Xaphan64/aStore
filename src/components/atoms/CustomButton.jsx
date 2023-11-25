// ASSETS

// STYLES

// LIBRARIES
import PropTypes from "prop-types";

// MISC

// COMPONENTS

// CONFIGURATION
const CustomButton = (props) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <button type={props.type} name={props.name} onClick={props.onClick} className={props.className}>
      {props.name} {props.children}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
