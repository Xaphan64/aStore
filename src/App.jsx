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
import Favorites from "./components/pages/Favorites/Favorites";
import ProductDetails from "./components/pages/ProductDetails/ProductDetails";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import ErrorPage from "./components/config/errorPage";
import Categories from "./components/pages/Categories/Categories";
import Cart from "./components/pages/Cart/Cart";
import Checkout from "./components/pages/Checkout/Checkout";
import Success from "./components/pages/Success/Success";
import SearchPage from "./components/pages/SearchPage/SearchPage";

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
          <Route path="/success" element={<Success />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
