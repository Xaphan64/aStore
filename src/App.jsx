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
import ProductDetails from "./components/pages/ProductDetails/ProductDetails";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import EditProduct from "./components/pages/EditProduct/EditProduct";

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
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
