// ASSETS

// STYLES

// LIBRARIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MISC

// COMPONENTS
import MainPage from "./components/pages/MainPage/MainPage";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Layout from "./components/layout/Layout/Layout";
import Orders from "./components/pages/Orders/Orders";
import Favorites from "./components/pages/Favorites/Favorites";
import AddProducts from "./components/pages/AddProducts/AddProducts";

// CONFIGURATION
const App = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add-products" element={<AddProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
