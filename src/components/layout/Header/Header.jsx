// ASSETS
import { profileIcon, favoriteIcon, cartIcon, dropdownIcon, phoneIcon, laptopIcon } from "../../assets/MUI-icons";
import { tvIcon, gamingIcon, booksIcon, foodIcon, toysIcon, furnitureIcon, searchIcon } from "../../assets/MUI-icons";

// STYLES
import "./Header.scss";

// LIBRARIES
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

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
  const isTablet = window.matchMedia("(max-width: 1080px")?.matches;
  const user = sessionStorage.getItem("token");
  const admin = sessionStorage.getItem("adminToken");

  // STATE CONSTANTS
  const [getFavoriteList, setFavoriteList] = useState(JSON.parse(localStorage?.getItem("favoriteList")));
  const [getCartList, setCartList] = useState(JSON.parse(localStorage?.getItem("cartProductsList")));

  const [isHeader, setIsHeader] = useState(false);
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
      location.pathname === "/success" ||
      location.pathname === "/favorites" ||
      location.pathname === `/product/${id}` ||
      location.pathname === "/cart" ||
      location.pathname === "/checkout" ||
      location.pathname === "/search"
    ) {
      setActive(false);
    }

    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setInterval(() => {
      setFavoriteList(JSON.parse(localStorage?.getItem("favoriteList")));
      setCartList(JSON.parse(localStorage?.getItem("cartProductsList")));
    }, 1000);
  }, []);

  // EVENT HANDLERS
  const handleDropdown = (dropdownType) => {
    const prevDropdown = (prevIsDropdownVisible) => ({
      ...prevIsDropdownVisible,
      [dropdownType]: !prevIsDropdownVisible[dropdownType],
    });

    setIsHeader(true);
    setIsDropdownVisible(prevDropdown);
  };

  const handleCategory = (category) => {
    setActive(category);
    navigate(`/categories/${category}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  return (
    <div className="header-container">
      <div className="header-mobile">
        <div className="header-row one">
          <h1 className="login-logo" onClick={() => navigate("/")}>
            aStore
          </h1>

          {!isMobile && (
            <Fragment>
              <form className="input-form">
                <CustomInput type="text" name="search" placeholder="Type here to search for something" />
                <CustomButton type="submit" onClick={handleSearch}>
                  {searchIcon}
                </CustomButton>
              </form>
            </Fragment>
          )}

          <div className="login-right-buttons">
            {isTablet && (
              <div className="header-dropdown-button" type="button" onClick={() => handleDropdown("account")}>
                <div className="left-icon">{profileIcon}</div>
                <div className="button-text">Account {dropdownIcon}</div>

                {isDropdownVisible.account && <DropdownAccount setIsDropdownVisible={setIsDropdownVisible} />}
              </div>
            )}

            <div
              className="header-dropdown-button"
              onClick={isTablet ? () => navigate("/favorites") : () => handleDropdown("favorites")}
            >
              <div className="left-icon">
                {getFavoriteList?.length > 0 && <span className="cart-length">{getFavoriteList?.length}</span>}
                {favoriteIcon}
              </div>
              <div className="button-text">Favorites {dropdownIcon}</div>

              {isDropdownVisible.favorites && !isTablet && (
                <DropdownFavorites
                  setIsDropdownVisible={setIsDropdownVisible}
                  isHeader={isHeader}
                  getFavoriteList={getFavoriteList}
                />
              )}
            </div>

            <div
              className="header-dropdown-button"
              onClick={isTablet ? () => navigate("/cart") : () => handleDropdown("cart")}
            >
              <div className="left-icon">
                {getCartList?.length > 0 && <span className="cart-length">{getCartList?.length}</span>}
                {cartIcon}
              </div>
              <div className="button-text">Cart {dropdownIcon}</div>

              {isDropdownVisible.cart && !isTablet && (
                <DropdownCart
                  setIsDropdownVisible={setIsDropdownVisible}
                  isHeader={isHeader}
                  getCartList={getCartList}
                />
              )}
            </div>

            {!isTablet && (
              <div className="header-dropdown-button" type="button" onClick={() => handleDropdown("account")}>
                <div className="left-icon">{profileIcon}</div>
                <div className="button-text">Account {dropdownIcon}</div>

                {isDropdownVisible.account && <DropdownAccount setIsDropdownVisible={setIsDropdownVisible} />}
              </div>
            )}
          </div>
        </div>

        {isMobile && (
          <Fragment>
            <form className="input-form">
              <CustomInput type="text" name="search" placeholder="Type here to search for something" />
              <CustomButton type="submit" onClick={handleSearch}>
                {searchIcon}
              </CustomButton>
            </form>
          </Fragment>
        )}
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
