// ASSETS
import { leftArrowIcon, rightArrowIcon } from "../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useRef, useState } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";

// CONFIGURATION

const MainPageCategories = (props) => {
  // PROPERTIES
  const { type = "", showAddFavorite, showRemoveFavorite, showaddCart } = props;

  // API REQUESTS
  const { data: products, setIsRerendering } = useFetch(`http://localhost:8000/${type}`);

  // LIBRARY CONSTANTS
  let scroll = useRef(null);

  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const slide = (shift) => {
    scroll.current.scrollBy({
      left: shift,
      behavior: "smooth",
    });

    scroll.current.scrollLeft = scroll.current.scrollLeft + shift;
    setScrollStart(scrollStart + shift);
    if (Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const scrollCheck = () => {
    setScrollStart(scroll.current.scrollLeft);
    if (Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  return (
    <div className="main-page-category-container">
      <h2 className="main-page-category-title">{type}</h2>
      <div className="main-page-category-body">
        <div
          onClick={() => slide(-100, scroll)}
          className={`left-arrow-left ${scrollStart < 1 ? "is-disabled-hide" : ""}`}
        >
          {leftArrowIcon}
        </div>

        <div className="main-page-category" ref={scroll} onScroll={() => scrollCheck(scroll)}>
          {products?.map((product, index) => (
            <div className="main-page-category-map" key={`category-${index}-${product?.id}`}>
              <ProductCard
                product={product}
                type={type}
                showAddFavorite={showAddFavorite}
                showRemoveFavorite={showRemoveFavorite}
                showaddCart={showaddCart}
                setIsRerendering={setIsRerendering}
              />
            </div>
          ))}
        </div>

        <div
          onClick={() => slide(+100, scroll)}
          className={`right-arrow-right ${!scrollEnd ? "" : "is-disabled-hide"}`}
        >
          {rightArrowIcon}
        </div>
      </div>
    </div>
  );
};
export default MainPageCategories;
