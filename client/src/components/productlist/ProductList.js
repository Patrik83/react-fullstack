import React from "react";
import { Link } from "react-router-dom";
import style from "./ProductList.module.css";

const ProductList = ({ products }) => {
  return (
    <main className={style.container}>
      {products.map((product) => (
        <article key={product.id} className={style.productCard}>
          <Link to={`/product/${product.id}`}>
            <img 
              src={`/images/${product.Images[0].imageUrl}`} 
              alt={`Bild på ${product.name}`}
            />
            <div>
              <h3>{product.name}</h3>
              <p>{product.price} kr</p>
            </div>
          </Link>
        </article>
      ))}
    </main>
  );
};

export default ProductList;