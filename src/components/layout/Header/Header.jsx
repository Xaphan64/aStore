// ASSETS
import { profileIcon, favoriteIcon, cartIcon, dropdownIcon, phoneIcon, laptopIcon } from "../../assets/MUI-icons";
import { tvIcon, gamingIcon, booksIcon, foodIcon, toysIcon, furnitureIcon } from "../../assets/MUI-icons";

// STYLES
import "./Header.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// MISC

// COMPONENTS
import CustomInput from "../../atoms/CustomInput";
import CustomButton from "../../atoms/CustomButton";
import { DropdownAccount } from "./Dropdown";

// CONFIGURATION
const Header = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  // STATE CONSTANTS
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  const handlerMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="header-container">
      <div className="header-row one">
        <h1 className="login-logo" onClick={() => navigate("/")}>
          aStore
        </h1>

        <CustomInput placeholder="Type here to search for something" />

        <div className="login-right-buttons">
          <div onMouseEnter={handlerMouseEnter} onMouseLeave={handleMouseLeave}>
            {profileIcon}
            <span>Account</span>
            {dropdownIcon}

            {isDropdownVisible && <DropdownAccount />}
          </div>

          <CustomButton>
            {favoriteIcon}
            <span>Favorites</span>
            {dropdownIcon}
          </CustomButton>

          <CustomButton>
            {cartIcon}
            <span>Cart</span>
            {dropdownIcon}
          </CustomButton>
        </div>
      </div>

      <div className="header-row two">
        <CustomButton>
          {phoneIcon}
          <span>Phones</span>
        </CustomButton>

        <CustomButton>
          {laptopIcon}
          <span>Laptops & PC</span>
        </CustomButton>

        <CustomButton>
          {tvIcon}
          <span>TV & Monitors</span>
        </CustomButton>

        <CustomButton>
          {gamingIcon}
          <span>Gaming</span>
        </CustomButton>

        <CustomButton>
          {booksIcon}
          <span>Books</span>
        </CustomButton>

        <CustomButton>
          {foodIcon}
          <span>Food</span>
        </CustomButton>

        <CustomButton>
          {toysIcon}
          <span>Toys</span>
        </CustomButton>

        <CustomButton>
          {furnitureIcon}
          <span>Furniture</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
