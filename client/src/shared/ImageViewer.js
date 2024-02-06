import React, {useState} from "react";

const ImageViewer = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const showNextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    return (
      <div>
        {images && images.length > 0 ? (
          <div>
            <img
              src={`/images/${images[currentImageIndex].imageUrl}`}
              alt={`Bild ${currentImageIndex + 1}`}
            />
            <button onClick={showNextImage}>Visa nästa bild</button>
          </div>
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
      </div>
    );
  };

  export default ImageViewer;
  