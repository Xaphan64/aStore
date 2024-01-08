// ASSETS

// STYLES
import "./Categories.scss";

// LIBRARIES
// import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // LIBRARY CONSTANTS
  const location = useLocation();
  const category = location.pathname.split("/")[location.pathname.split("/").length - 1];

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/${category}`);
  // const { data: categories } = useFetch("http://localhost:8000/categories");

  // const phones = products?.filter((product) => product.type === "Phones");
  // const laptops = products?.filter((product) => product.type === "Laptops");
  // const tv = products?.filter((product) => product.type === "TV");
  // const gaming = products?.filter((product) => product.type === "Gaming");
  // const books = products?.filter((product) => product.type === "Books");
  // const food = products?.filter((product) => product.type === "Food");
  // const toys = products?.filter((product) => product.type === "Toys");
  // const furniture = products?.filter((product) => product.type === "Furniture");

  // const category = window.location.search;

  // const urlParams = new URLSearchParams(window.location.search);
  // const category = urlParams.get("phones");

  // STATE CONSTANTS
  // console.log(window.location.search);
  // console.log(urlParams);
  // console.log(category);
  // const [type, setType] = useState("");
  // const [currentCategory, setCurrentCategory] = useState("");

  // LIFE CYCLE

  // const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

  // if (currentPage === "add-product") {
  //   setIsLoading(false);
  //   return;
  // }

  // console.log(category);

  // useEffect(() => {
  //   if (category === "?category=phones") {
  //     setType("phones");
  //   } else if (category === "?category=laptops") {
  //     setType("laptops");
  //   } else if (category === "?category=tv") {
  //     setType("tv");
  //   } else if (category === "?category=gaming") {
  //     setType("gaming");
  //   } else if (category === "?category=books") {
  //     setType("books");
  //   } else if (category === "?category=food") {
  //     setType("food");
  //   } else if (category === "?category=toys") {
  //     setType("toys");
  //   } else if (category === "?category=furniture") {
  //     setType("furniture");
  //   } else {
  //     console.log("Error! There is no category selected");
  //   }
  // }, [category]);

  // console.log(categories);

  // useEffect(() => {
  //   const categories = ["phones", "laptops", "tv", "gaming", "books", "food", "toys", "furniture"];

  //   const categoryMap = {};
  //   categories.forEach((category) => {
  //     categoryMap[`?category=${category}`] = category;
  //   });

  //   console.log(categoryMap);

  //   if (categoryMap) {
  //     setType(categoryMap);
  //   } else {
  //     console.log("error");
  //   }
  // }, [category]);

  // useEffect(() => {

  // }, [currentCategory]);

  // useEffect(() => {
  //   const categoryMap = {
  //     "?category=phones": "phones",
  //     "?category=laptops": "laptops",
  //     "?category=tv": "tv",
  //     "?category=gaming": "gaming",
  //     "?category=books": "books",
  //     "?category=food": "food",
  //     "?category=toys": "toys",
  //     "?category=furniture": "furniture",
  //   };

  //   // const categoryMap = {
  //   //   [`?category=${categories}`]: { categories },
  //   // };

  //   // const categoryMap = categories.reduce((acc, category) => {
  //   //   acc[`?category=${category}`] = category;
  //   //   return acc;
  //   // });

  //   console.log(categoryMap);

  //   const categoryType = categoryMap[category];

  //   console.log(categoryType);

  //   if (categoryType) {
  //     setType(categoryType);
  //   } else {
  //     console.log("Error! There is no category selected");
  //   }
  // }, [category]);

  // EVENT HANDLERS

  return (
    <div className="categories-container">
      {error && <h2 className="error-message">{error}</h2>}
      {isLoading && <h2 className="error-message">Loading data...</h2>}

      {!isLoading && !error && (
        <Fragment>
          {/* <div>
            {categories.map((category, index) => (
              <div key={index}>{category}</div>
            ))}
          </div> */}

          {products.length > 0 ? (
            <div className="categories-map">
              <h2 className="category-title">{category}</h2>
              <div className="category-card">
                {products?.map((product, index) => (
                  <Fragment key={`categories-${index}-${product.id}`}>
                    <ProductCard product={product} />
                  </Fragment>
                ))}
              </div>
            </div>
          ) : (
            <h2 className="error-message">Currently, there are not products available in this category.</h2>
          )}

          {/* 
          {type === "phones" && (
            <div className="category-tab">
              <h2 className="category-title">Phones</h2>
              {phones?.map((product, index) => (
                <div key={`phones-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "laptops" && (
            <div className="category-tab">
              <h2 className="category-title">Laptops</h2>
              {laptops?.map((product, index) => (
                <div key={`laptops-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "tv" && (
            <div className="category-tab">
              <h2 className="category-title">TVs</h2>
              {tv?.map((product, index) => (
                <div key={`tv-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "gaming" && (
            <div className="category-tab">
              <h2 className="category-title">Gaming</h2>
              {gaming?.map((product, index) => (
                <div key={`gaming-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "books" && (
            <div className="category-tab">
              <h2 className="category-title">Books</h2>
              {books?.map((product, index) => (
                <div key={`books-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "food" && (
            <div className="category-tab">
              <h2 className="category-title">Food</h2>
              {food?.map((product, index) => (
                <div key={`food-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "toys" && (
            <div className="category-tab">
              <h2 className="category-title">Toys</h2>
              {toys?.map((product, index) => (
                <div key={`toys-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {type === "furniture" && (
            <div className="category-tab">
              <h2 className="category-title">Furniture</h2>
              {furniture?.map((product, index) => (
                <div key={`furniture-${index}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )} */}
        </Fragment>
      )}
    </div>
  );
};

export default Categories;
