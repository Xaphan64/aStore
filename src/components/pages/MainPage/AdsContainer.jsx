// ASSETS
import { leftArrowIcon, rightArrowIcon, circleIcon, circleEmptyIcon } from "../../assets/MUI-icons";

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";

// MISC

// COMPONENTS

// CONFIGURATION
const ImageSlider = ({ slides }) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideBackground = {
    backgroundImage: `url(${slides[currentSlide].url})`,
  };
  // LIFE CYCLE
  useEffect(() => {
    const changeSlide = setInterval(() => {
      const isLastSlide = currentSlide === slides.length - 1;
      const newSlide = isLastSlide ? 0 : currentSlide + 1;

      setCurrentSlide(newSlide);
    }, 10000);

    return () => clearInterval(changeSlide);
  }, [currentSlide, slides.length]);

  // EVENT HANDLERS
  const handlePreviousSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newSlide = isFirstSlide ? slides.length - 1 : currentSlide - 1;

    setCurrentSlide(newSlide);
  };

  const handleNextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newSlide = isLastSlide ? 0 : currentSlide + 1;

    setCurrentSlide(newSlide);
  };

  const handleJumpToSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <div className="ads-carousel-container">
      <div className="ads-carousel-arrow left" onClick={handlePreviousSlide}>
        {leftArrowIcon}
      </div>
      <div className="ads-carousel-arrow right" onClick={handleNextSlide}>
        {rightArrowIcon}
      </div>
      <div className="ads-slide" style={slideBackground}>
        {/* <span className="ads-text">
          {currentSlide === 0 && (
            <span>
              This is a Ecommerce project made by Alexandru-Daniel Sarbu. This project is made in React using API and
              Axios library.
            </span>
          )}

          {currentSlide === 1 && (
            <span>
              In this project you can create, add, delete and edit a product only if you are an admin. If you are a
              normal user you can add to favorites, add to card and buy one or multiple products.
            </span>
          )}

          {currentSlide === 2 && (
            <span>
              Please note that if the products are not loading refresh the page some times, sometimes the API fetch
              works very slowly.
            </span>
          )}
        </span> */}
      </div>

      <span className="ads-text">
        {currentSlide === 0 && (
          <span>
            This is a Ecommerce project made by Alexandru-Daniel Sarbu. This project is made in React using API and
            Axios library.
          </span>
        )}

        {currentSlide === 1 && (
          <span>
            In this project you can create, add, delete and edit a product only if you are an admin. If you are a normal
            user you can add to favorites, add to card and buy one or multiple products.
          </span>
        )}

        {currentSlide === 2 && (
          <span>
            Please note that if the products are not loading refresh the page some times, sometimes the API fetch works
            very slowly.
          </span>
        )}
      </span>

      <div className="ads-dots-container">
        {currentSlide === 0 ? (
          <div className="ads-dots">{circleIcon}</div>
        ) : (
          <div className="ads-dots" onClick={() => handleJumpToSlide(0)}>
            {circleEmptyIcon}
          </div>
        )}

        {currentSlide === 1 ? (
          <div className="ads-dots">{circleIcon}</div>
        ) : (
          <div className="ads-dots" onClick={() => handleJumpToSlide(1)}>
            {circleEmptyIcon}
          </div>
        )}

        {currentSlide === 2 ? (
          <div className="ads-dots">{circleIcon}</div>
        ) : (
          <div className="ads-dots" onClick={() => handleJumpToSlide(2)}>
            {circleEmptyIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
