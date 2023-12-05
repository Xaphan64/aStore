// ASSETS

import { Link } from "react-router-dom";

// STYLES

// LIBRARIES

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 10 }}>
      <h1>Sorry</h1>
      <span>This page cannot be found or doest not exist</span>
      <Link to="/">Go back to homepage...</Link>
    </div>
  );
};

export default ErrorPage;
