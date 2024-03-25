import React, {useState} from "react";
import "../App.css";

const ProductImageViewer = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (index) => {
      setCurrentImageIndex(index);
    }
  
    return (
      <div>
        {images && images.length > 0 ? (
          <div>
            <img src={`/images/${images[currentImageIndex].imageUrl}`} alt={`Bild ${currentImageIndex + 1}`} />
            <div>
            {images.map((image, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          </div>
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
      </div>
    );
  };

  export default ProductImageViewer;
  