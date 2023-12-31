// ASSETS

// STYLES

// LIBRARIES
import PropTypes from "prop-types";

// MISC

// COMPONENTS

// CONFIGURATION
const CustomInput = (props) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      value={props.value}
      maxLength={props.maxLength}
      minLength={props.minLength}
      required={props.required}
    />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
};

export default CustomInput;
