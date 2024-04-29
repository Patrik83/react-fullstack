import React from "react";
import style from "../components/productitem/ProductItem.module.css";

const ImageViewer = ({ images, onImageClick }) => {
  const handleImageClick = (index) => {
    onImageClick(index); // Skicka det nya indexet till förälderkomponenten
  };

  return (
    <div className={style.imageList}>
      {images.map((image, index) => (
        <img
          key={index}
          src={`/images/${image.imageUrl}`}
          alt={`Bild ${index + 1}`}
          className={style.imgSmall}
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageViewer;