// ASSETS

// STYLES

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 10 }}>
      <h1>Thank you for buying from aStore</h1>
      <h2>Your order was registered. We will contact you as soon as possible to schedule the delivery date.</h2>
      <span>
        You can go back to <Link to="/">homepage</Link> to browse more thorugh our products.
      </span>
    </div>
  );
};

export default Success;
