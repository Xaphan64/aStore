// ASSETS
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import TabletAndroidOutlinedIcon from "@mui/icons-material/TabletAndroidOutlined";
import LaptopChromebookOutlinedIcon from "@mui/icons-material/LaptopChromebookOutlined";
import TvIcon from "@mui/icons-material/Tv";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// STYLES
import "./Header.scss";

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomInput from "../../atoms/CustomInput";
import CustomButton from "../../atoms/CustomButton";

// CONFIGURATION
const Header = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="header-container">
      <div className="header-row one">
        <h1 className="login-logo" onClick={() => navigate("/")}>
          aStore
        </h1>

        <CustomInput placeholder="Type here to search for something" />

        <div className="login-right-buttons">
          <CustomButton>
            <PersonOutlineOutlinedIcon />
            <span>Account</span>
            <ArrowDropDownIcon />
          </CustomButton>

          <CustomButton>
            <FavoriteBorderOutlinedIcon />
            <span>Favorites</span>
            <ArrowDropDownIcon />
          </CustomButton>

          <CustomButton>
            <ShoppingCartOutlinedIcon />
            <span>Cart</span>
            <ArrowDropDownIcon />
          </CustomButton>
        </div>
      </div>

      <div className="header-row two">
        <CustomButton>
          <PhoneAndroidOutlinedIcon />
          <span>Phones</span>
        </CustomButton>

        <CustomButton>
          <TabletAndroidOutlinedIcon />
          <span>Tablets</span>
        </CustomButton>

        <CustomButton>
          <LaptopChromebookOutlinedIcon />
          <span>Laptops</span>
        </CustomButton>

        <CustomButton>
          <TvIcon />
          <span>TV</span>
        </CustomButton>

        <CustomButton>
          <SportsEsportsOutlinedIcon />
          <span>Gaming</span>
        </CustomButton>

        <CustomButton>
          <ImportContactsOutlinedIcon />
          <span>Books</span>
        </CustomButton>

        <CustomButton>
          <LunchDiningOutlinedIcon />
          <span>Food</span>
        </CustomButton>

        <CustomButton>
          <ExtensionIcon />
          <span>Toys</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
