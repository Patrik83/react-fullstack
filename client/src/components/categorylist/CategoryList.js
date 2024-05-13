import React from "react";
import { Link } from "react-router-dom";
import style from "./CategoryList.module.css";

const CategoryList = ({ products, categoryName }) => {
  return (
    <div>
      <p style={{fontSize: "40px"}}>{categoryName}</p>
    <main className={style.categoryWrapper}>
      {products.map((product) => (
        <article className={style.categoryCard} key={product.id} >
          <Link to={`/product/${product.id}`}>
            <img src={`/images/${product.Images[0].imageUrl}`} alt={`Bild 1`} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
          </Link>
        </article>
      ))}
    </main>
    </div>
  );
};

export default CategoryList;