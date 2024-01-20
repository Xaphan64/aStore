// ASSETS

// STYLES
import "./Categories.scss";

// LIBRARIES
import { Fragment, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";
import Snackbar from "../../atoms/Snackbar/Snackbar";

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  const location = useLocation();
  const category = location.pathname.split("/")[location.pathname.split("/").length - 1];

  const snackbarRefAdd = useRef(null);
  const snackbarRefRemove = useRef(null);
  const snackbarRefCart = useRef(null);
  const snackbarType = {
    addFavorite: "addFavorite",
    removeFavorite: "removeFavorite",
    addCart: "addCart",
  };
  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/${category}`);

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    console.log(category);
  }, [category]);

  // EVENT HANDLERS
  const showAddFavorite = () => {
    snackbarRefAdd.current.show();
  };

  const showRemoveFavorite = () => {
    snackbarRefRemove.current.show();
  };

  const showaddCart = () => {
    snackbarRefCart.current.show();
  };

  return (
    <div className="categories-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      <Snackbar message="Product added to favorites" ref={snackbarRefAdd} type={snackbarType.addFavorite} />

      <Snackbar message="Product removed from favorites" ref={snackbarRefRemove} type={snackbarType.removeFavorite} />

      <Snackbar message="Product added to cart" ref={snackbarRefCart} type={snackbarType.addCart} />

      {!isLoading && !error && (
        <Fragment>
          {products.length > 0 ? (
            <div className="categories-map">
              <h2 className="category-title">{category}</h2>
              <div className="category-card">
                {products?.map((product, index) => (
                  <Fragment key={`categories-${index}-${product.id}`}>
                    <ProductCard
                      product={product}
                      category={category}
                      showAddFavorite={showAddFavorite}
                      showRemoveFavorite={showRemoveFavorite}
                      showaddCart={showaddCart}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          ) : (
            <h2 className="error-message">Currently, there are not products available in this category.</h2>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Categories;
