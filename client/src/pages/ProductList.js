import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/ApiService";
import { CartContext } from "../context/ContextProvider";

export default function ProductList() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const products = await getProducts();
      setListOfProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          <div className="container">
            {listOfProducts.map((product) => (
              <div className="product" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={`/images/${product.Images[0].imageUrl}`} alt={`Bild 1`} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </Link>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
