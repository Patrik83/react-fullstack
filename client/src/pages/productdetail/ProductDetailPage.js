import React from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/productitem/ProductItem";
import useApi from "../../hooks/useApi";

const ProductDetailPage = () => {
  let { productId } = useParams();
  const { data: product, loaded } = useApi(`http://localhost:3001/products/${productId}`);

  if (!loaded) {
    return <div>Laddar...</div>;
  }

  if (!product) {
    return <div>Inga produkter hittades.</div>;
  }

  return (
    <div>
      <ProductItem product={product} />
    </div>
  );
};

export default ProductDetailPage;