import React from "react";
import { Link } from "react-router-dom";
import style from "./CategoryList.module.css";

const CategoryList = ({ products }) => {
  return (
    <main className={style.categoryWrapper}>
      {products.map((product) => (
        <article className={style.categoryCard} key={product.id} >
          <Link to={`/product/${product.id}`}>
            <img src={`/images/${product.Images[0].imageUrl}`} alt={`Bild 1`} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
          </Link>
        </article>
      ))}
    </main>
  );
};

export default CategoryList;