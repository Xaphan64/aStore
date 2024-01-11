// ASSETS

// STYLES
import "./Favorites.scss";
// LIBRARIES

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import FavoriteCard from "../../cards/FavoriteCard";

// CONFIGURATION
const Favorites = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: phones } = useFetch(`http://localhost:8000/phones`);

  // LIBRARY CONSTANTS
  const phonesFavorite = phones.filter((product) => product.favorite === true);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="favorite-container">
      <h2 className="favorite-title">My favorites</h2>
      {phones.length > 0 && (
        <div className="favorite-category">
          {phonesFavorite.map((product, index) => (
            <div className="favorite-map" key={`phones-${index}-${product?.id}`}>
              <FavoriteCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
