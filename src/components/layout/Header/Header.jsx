// ASSETS
import { profileIcon, favoriteIcon, cartIcon, dropdownIcon, phoneIcon, laptopIcon } from "../../assets/MUI-icons";
import { tvIcon, gamingIcon, booksIcon, foodIcon, toysIcon, furnitureIcon } from "../../assets/MUI-icons";

// STYLES
import "./Header.scss";

// LIBRARIES
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// MISC

// COMPONENTS
import CustomInput from "../../atoms/CustomInput";
import CustomButton from "../../atoms/CustomButton";
import DropdownAccount from "./Dropdowns/DropdownAccount";
import DropdownFavorites from "./Dropdowns/DropdownFavorites";
import DropdownCart from "./Dropdowns/DropdownCart";

// CONFIGURATION
const Header = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isMobile = window.matchMedia("(max-width: 750px")?.matches;
  const getProductsList = JSON.parse(localStorage?.getItem("cartProductsList"));

  // STATE CONSTANTS
  const [active, setActive] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    account: false,
    favorites: false,
    cart: false,
  });

  // LIFE CYCLE
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/add-product" ||
      location.pathname === "/orders" ||
      location.pathname === "/favorites" ||
      location.pathname === `/product/${id}` ||
      location.pathname === "/cart"
    ) {
      setActive(false);
    }

    // eslint-disable-next-line
  }, [location]);

  // EVENT HANDLERS
  const handleDropdown = (dropdownType) => {
    const prevDropdown = (prevIsDropdownVisible) => ({
      ...prevIsDropdownVisible,
      [dropdownType]: !prevIsDropdownVisible[dropdownType],
    });

    setIsDropdownVisible(prevDropdown);
  };

  const handleCategory = (category) => {
    setActive(category);
    navigate(`/categories/${category}`);
  };

  return (
    <div className="header-container">
      <div className="header-mobile">
        <div className="header-row one">
          <h1 className="login-logo" onClick={() => navigate("/")}>
            aStore
          </h1>

          {!isMobile && <CustomInput type="text" name="search" placeholder="Type here to search for something" />}

          <div className="login-right-buttons">
            <CustomButton type="button" onClick={() => handleDropdown("account")}>
              <div className="left-icon">{profileIcon}</div>
              <div className="button-text">Account {dropdownIcon}</div>

              {isDropdownVisible.account && <DropdownAccount setIsDropdownVisible={setIsDropdownVisible} />}
            </CustomButton>

            <CustomButton type="button" onClick={() => handleDropdown("favorites")}>
              <div className="left-icon">{favoriteIcon}</div>
              <div className="button-text">Favorites {dropdownIcon}</div>

              {isDropdownVisible.favorites && <DropdownFavorites setIsDropdownVisible={setIsDropdownVisible} />}
            </CustomButton>

            <CustomButton type="button" onClick={() => handleDropdown("cart")}>
              <div className="left-icon">
                {getProductsList?.length > 0 && <span className="cart-length">{getProductsList.length}</span>}
                {cartIcon}
              </div>
              <div className="button-text">Cart {dropdownIcon}</div>

              {isDropdownVisible.cart && <DropdownCart setIsDropdownVisible={setIsDropdownVisible} />}
            </CustomButton>
          </div>
        </div>

        {isMobile && <CustomInput type="text" name="search" placeholder="Type here to search for something" />}
      </div>

      <div className="header-row two">
        <CustomButton
          type="button"
          onClick={() => handleCategory("phones")}
          className={active === "phones" ? "active-tab" : "inactive"}
        >
          {phoneIcon}
          <span>Phones</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("laptops")}
          className={active === "laptops" ? "active-tab" : "inactive"}
        >
          {laptopIcon}
          <span>Laptops</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("tv")}
          className={active === "tv" ? "active-tab" : "inactive"}
        >
          {tvIcon}
          <span>TV</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("gaming")}
          className={active === "gaming" ? "active-tab" : "inactive"}
        >
          {gamingIcon}
          <span>Gaming</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("books")}
          className={active === "books" ? "active-tab" : "inactive"}
        >
          {booksIcon}
          <span>Books</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("food")}
          className={active === "food" ? "active-tab" : "inactive"}
        >
          {foodIcon}
          <span>Food</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("toys")}
          className={active === "toys" ? "active-tab" : "inactive"}
        >
          {toysIcon}
          <span>Toys</span>
        </CustomButton>

        <CustomButton
          type="button"
          onClick={() => handleCategory("furniture")}
          className={active === "furniture" ? "active-tab" : "inactive"}
        >
          {furnitureIcon}
          <span>Furniture</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
