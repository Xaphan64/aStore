// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";

// MISC

// COMPONENTS
import CustomInput from "../../atoms/CustomInput";
import SearchCard from "../../cards/SearchCard";

// CONFIGURATION
const SearchBar = ({ placeholder, data }) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [filteredData, setFilteredData] = useState([]);

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search-inputs">
      <div className="searchbar-container">
        <CustomInput type="text" placeholder={placeholder} onChange={handleFilter} />
        <div className="search-icon"></div>
      </div>

      {filteredData.length !== 0 && (
        <div
          className="search-results"
          style={{ display: "flex", gap: 16, flexDirection: "column", paddingTop: 16, paddingBottom: 16 }}
        >
          {filteredData.map((product, index) => {
            return <SearchCard product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
