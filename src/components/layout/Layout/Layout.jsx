// ASSETS

// STYLES
import "./Layout.scss";

// LIBRARIES
import { Outlet } from "react-router-dom";

// MISC

// COMPONENTS
import Header from "../Header/Header";

// CONFIGURATION
const Layout = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="layout-container">
      <div className="header">
        <Header />
      </div>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
