// ASSETS
import { leftArrowIcon, rightArrowIcon, circleIcon, circleEmptyIcon } from "../../assets/MUI-icons";
import slideOne from "../../assets/carousel/slideOne.webp";
import slideTwo from "../../assets/carousel/slideTwo.png";
import slideThree from "../../assets/carousel/slideThree.jpg";

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

  // const slideBackground = {
  //   backgroundImage: `url(${slides[currentSlide].url})`,
  // };

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

      {/* <div className="ads-slides"> */}
      {currentSlide === 0 && (
        <div className="ads-slide">
          <img src={slideOne} alt="slideOne" />
          <span>
            This is a Ecommerce project made by Alexandru-Daniel Sarbu. This project is made in React using Axios
            library, fetching API from a JSON server.
          </span>
        </div>
      )}

      {currentSlide === 1 && (
        <div className="ads-slide">
          <img src={slideTwo} alt="slideTwo" />
          <span>
            As a user, in this project you can add products to favorite, add products to cart and buy multiple products.
            As an admin you can even create, delete and edit products.
          </span>
        </div>
      )}

      {currentSlide === 2 && (
        <div className="ads-slide">
          <img src={slideThree} alt="slideThree" />
          <span>
            Due to the fact that the JSON server is deployed on render.com the API may fetch with a several minutes
            delay for the first time.
          </span>
        </div>
      )}
      {/* </div> */}

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
