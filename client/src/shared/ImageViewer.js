import React, {useState} from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ImageViewer = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const showNextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    return (
      <div>
        {images && images.length > 0 ? (
          <div>
            <img src={`/images/${images[currentImageIndex].imageUrl}`} alt={`Bild ${currentImageIndex + 1}`} />
            <button onClick={showNextImage}><ArrowRightIcon /></button>
          </div>
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
      </div>
    );
  };

  export default ImageViewer;
  