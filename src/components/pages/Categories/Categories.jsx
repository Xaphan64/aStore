// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";

// MISC
import { useFetch } from "../../hooks/useFetch";

// COMPONENTS
import ProductCard from "../../cards/ProductCard";
import { useLocation } from "react-router-dom";

// CONFIGURATION
const Categories = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error } = useFetch(`http://localhost:8000/products/`);

  // LIBRARY CONSTANTS
  const location = useLocation();
  const category = location.search;

  const phones = products?.filter((product) => product.type === "Phones");
  const laptops = products?.filter((product) => product.type === "Laptops");
  const tv = products?.filter((product) => product.type === "TV");
  const gaming = products?.filter((product) => product.type === "Gaming");
  const books = products?.filter((product) => product.type === "Books");
  const food = products?.filter((product) => product.type === "Food");
  const toys = products?.filter((product) => product.type === "Toys");
  const furniture = products?.filter((product) => product.type === "Furniture");

  // const category = window.location.search;

  // const urlParams = new URLSearchParams(window.location.search);
  // const category = urlParams.get("phones");

  // STATE CONSTANTS
  // console.log(window.location.search);
  // console.log(urlParams);
  // console.log(category);
  const [type, setType] = useState("");

  // LIFE CYCLE

  // const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

  // if (currentPage === "add-product") {
  //   setIsLoading(false);
  //   return;
  // }

  // console.log(category);

  useEffect(() => {
    if (category === "?category=phones") {
      setType("phones");
    } else if (category === "?category=laptops") {
      setType("laptops");
    } else if (category === "?category=tv") {
      setType("tv");
    } else if (category === "?category=gaming") {
      setType("gaming");
    } else if (category === "?category=books") {
      setType("books");
    } else if (category === "?category=food") {
      setType("food");
    } else if (category === "?category=toys") {
      setType("toys");
    } else if (category === "?category=furniture") {
      setType("furniture");
    } else {
      console.log("Error! There is no category selected");
    }
  }, [category]);

  // EVENT HANDLERS
  return (
    <div className="categories-container">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading data...</h2>}

      {!isLoading && !error && (
        <div>
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
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
