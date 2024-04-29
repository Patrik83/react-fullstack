import React from "react";
import useApi from "../../hooks/useApi";
import ProductList from "../../components/productlist/ProductList";

const HomePage = () => {
    const { data: products, loaded } = useApi(`http://localhost:3001/products/`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

    if (!products) {
      return <div>Inga produkter hittades.</div>;
    }

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;