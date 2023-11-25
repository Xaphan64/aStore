// ASSETS

// STYLES

// LIBRARIES
import PropTypes from "prop-types";

// MISC

// COMPONENTS

// CONFIGURATION
const CustomTextArea = (props) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <textarea
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      value={props.value}
      required={props.required}
    />
  );
};

CustomTextArea.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default CustomTextArea;
