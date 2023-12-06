// ASSETS

// STYLES

// LIBRARIES
import { nanoid } from "nanoid";

// MISC
import { useForm } from "../../hooks/useForm";
import { productType } from "../../config/productOptions";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomTextArea from "../../atoms/CustomTextArea";
import CustomInput from "../../atoms/CustomInput";
import CustomDropdown from "../../atoms/CustomDropdown";
import ProductCard from "../../cards/ProductCard";
import { useFetch } from "../../hooks/useFetch";

// CONFIGURATION
const AddProducts = () => {
  // PROPERTIES

  // API REQUESTS
  const { data: products, isLoading, error, setData: setProducts } = useFetch("http://localhost:8000/products");

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const { inputValues, handleInputChange, resetForm, handleImageChange } = useForm({
    pName: "",
    pDescription: "",
    pImage: "",
    pType: "",
    price: "",
  });

  // LIFE CYCLE

  // useEffect(() => {
  //   fetch("http://localhost:8000/products")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error("Could not fetch product data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProducts(data);
  //       setIsLoading(false);
  //       setError(null);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/products");
  //       setProducts(response.data);
  //       setIsLoading(false);
  //       setError(null);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // EVENT HANDLERS
  const addProduct = (product) => {
    //create a new product
    const newProduct = {
      id: nanoid(),
      pName: product.pName,
      pDescription: product.pDescription,
      pImage: product.pImage,
      pType: product.pType,
      price: product.price,
    };

    //add newProduct to the products list
    const newProductList = [...products, newProduct];

    //save newProductList in state
    setProducts(newProductList);
  };

  const deleteProduct = (id) => {
    //create a newProducts array and filter the products that does not match with the id
    const newProducts = products.filter((product) => {
      return product.id !== id;
    });

    //save in state
    setProducts(newProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // addProduct(inputValues);
    // resetForm();

    // const product = {};

    // fetch("http://localhost:8000/products"),
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(product),
    //   };
  };

  return (
    <div className="add-products-container">
      <h1>Add Products</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <span>Product name:</span>
          <CustomInput type="text" name="pName" value={inputValues.pName} onChange={handleInputChange} />
        </div>

        <div>
          <span>Product description:</span>
          <CustomTextArea
            type="text"
            name="pDescription"
            value={inputValues.pDescription}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <span>Product image:</span>
          <CustomInput type="file" name="pImage" onChange={handleImageChange} />
        </div>

        <div>
          <span>Product type:</span>
          <CustomDropdown name="pType" value={inputValues.pType} onChange={handleInputChange} options={productType} />
        </div>

        <div>
          <span>Product price:</span>
          <CustomInput type="text" name="price" value={inputValues.price} onChange={handleInputChange} />
        </div>

        <CustomButton type="submit" name="Add product" />
      </form>

      <h1>product card</h1>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {products && <ProductCard products={products} deleteProduct={deleteProduct} />}
    </div>
  );
};

export default AddProducts;
