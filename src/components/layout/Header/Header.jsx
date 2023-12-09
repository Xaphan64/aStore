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
import DropdownAccount from "./Dropdown";

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
  const handleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCategory = (category) => {
    navigate(`/categories?=${category}`);
  };

  return (
    <div className="header-container">
      <div className="header-row one">
        <h1 className="login-logo" onClick={() => navigate("/")}>
          aStore
        </h1>

        <CustomInput type="text" name="search" placeholder="Type here to search for something" />

        <div className="login-right-buttons">
          <CustomButton type="button" onClick={handleDropdown}>
            <div className="left-icon">{profileIcon}</div>
            <span>Account {dropdownIcon}</span>

            {isDropdownVisible && <DropdownAccount />}
          </CustomButton>

          <CustomButton type="button">
            <div className="left-icon">{favoriteIcon}</div>
            <span>Favorites</span>
            {dropdownIcon}
          </CustomButton>

          <CustomButton type="button">
            <div className="left-icon">{cartIcon}</div>
            <span>Cart</span>
            {dropdownIcon}
          </CustomButton>
        </div>
      </div>

      <div className="header-row two">
        <CustomButton type="button" onClick={() => handleCategory("phones")}>
          {phoneIcon}
          <span>Phones</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("laptops")}>
          {laptopIcon}
          <span>Laptops</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("tv")}>
          {tvIcon}
          <span>TV</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("gaming")}>
          {gamingIcon}
          <span>Gaming</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("books")}>
          {booksIcon}
          <span>Books</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("food")}>
          {foodIcon}
          <span>Food</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("toys")}>
          {toysIcon}
          <span>Toys</span>
        </CustomButton>

        <CustomButton type="button" onClick={() => handleCategory("furniture")}>
          {furnitureIcon}
          <span>Furniture</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
