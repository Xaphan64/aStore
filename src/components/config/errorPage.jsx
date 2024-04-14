// ASSETS

import { Link } from "react-router-dom";

// STYLES

// LIBRARIES
import "../pages/Success/Success.scss";

// MISC

// COMPONENTS

// CONFIGURATION
const ErrorPage = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="success-container">
      <h1>Sorry</h1>
      <span>This page cannot be found or doest not exist</span>
      <Link className="link" to="/">
        Go back to homepage...
      </Link>
    </div>
  );
};

export default ErrorPage;
