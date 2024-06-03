import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartManager";
import ImageViewer from "../../shared/ImageViewer";
import style from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className={style.productWrapper}>
          <section className={style.imgThumb}>
            <ImageViewer images={product.Images} onImageClick={setSelectedImageIndex} />
          </section>

          <div className={style.pictureWrapper}>
            {product.Images && product.Images.length > 0 && (
              <picture>
                <img
                  src={`/images/${product.Images[selectedImageIndex].imageUrl}`}
                  alt={`Bild ${selectedImageIndex + 1}`}
                  className={style.img}
                />
              </picture>
            )}
          </div>

          <aside className={style.productDetails}>
            <h2>{product.name}</h2>
            <p>{product.price} kr</p>
            <div>
              <button onClick={() => addToCart(product)}>Handla</button>
            </div>
          </aside>
    </main>
  );
};

export default ProductItem;