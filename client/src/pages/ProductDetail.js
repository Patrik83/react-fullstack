import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "../shared/ImageViewer";
import { getProductById } from "../services/ApiService";

const ShowProducts = () => {
  let { productId } = useParams();
  const [productObject, setProductObject] = useState({});

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const productData = await getProductById(productId);
        setProductObject(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [productId]);
  
  return (
    <div>
      <h2>{productObject.name}</h2>
      <ImageViewer images={productObject.Images} />
      <p>{productObject.price}</p>
    </div>
  );
};

export default ShowProducts;
