// ASSETS

// STYLES
import "./Success.scss";
// LIBRARIES
import { Link } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const Success = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="success-container">
      <h2>Thank you for buying from aStore</h2>
      <h3>Your order was registered, we will contact you as soon as possible to schedule the delivery date.</h3>
      <span>
        You can go back to{" "}
        <Link className="link" to="/">
          homepage
        </Link>{" "}
        to browse more through our products.
      </span>
    </div>
  );
};

export default Success;
