import React, { useState, useEffect } from "react";
import axios from "axios";
import useApi from "../../hooks/useApi";
import style from "./Admin.module.css";

const Admin = () => {
  const { data: categories, loaded: cate } = useApi(`http://localhost:3001/categories/`);
  const { data: products, loaded } = useApi(`http://localhost:3001/products/`);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [categoryChanges, setCategoryChanges] = useState({});

  useEffect(() => {
    if (products) {
      setUpdatedProducts(products);
    }
  }, [products]);

  const handleNameChange = (id, newName) => {
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, name: newName } : product
      )
    );
  };

  const handlePriceChange = (id, newPrice) => {
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    );
  };

  const handleCategoryChange = (id, newCategoryId) => {
    console.log("New Category ID:", newCategoryId);
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              Categories: [{ id: newCategoryId }],
            }
          : product
      )
    );
    setCategoryChanges((prevChanges) => ({
      ...prevChanges,
      [id]: newCategoryId,
    }));
  };

  const handleSaveChanges = async (productId) => {
    const updatedProduct = updatedProducts.find((product) => product.id === productId);
    console.log('Updated Product:', updatedProduct);

    try {
      const updatedCategoryId = categoryChanges[productId];

      // Uppdatera produktens namn, pris och kategori
      const productData = {
        name: updatedProduct.name,
        price: updatedProduct.price,
        categoryId: updatedCategoryId || updatedProduct.Categories[0]?.id
      };

      const response = await axios.put(`http://localhost:3001/products/${productId}`, productData);
      console.log('Changes saved!', response.data);

    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!loaded || !cate) {
    return <div>Laddar...</div>;
  }

  if (!products) {
    return <div>Inga produkter hittades.</div>;
  }

  return (
    <div>
      {updatedProducts.map((item) => {
        const currentCategory = item.Categories[0];
        const otherCategories = categories.filter(category => category.id !== currentCategory.id);
        
        return (
          <div className={style.container} key={item.id}>
            <div>{item.id}</div>
            <div>
              {item.Images.map((image) => (
                <div key={image.id}>
                  <img src={`/images/${image.imageUrl}`} alt="Produktbild" />
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleNameChange(item.id, e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                value={item.price}
                onChange={(e) => handlePriceChange(item.id, e.target.value)}
              />
            </div>
            <div>
              <select
                value={currentCategory.id}
                onChange={(e) => handleCategoryChange(item.id, e.target.value)}
              >
                <option value={currentCategory.id}>{currentCategory.name}</option>
                {otherCategories.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={() => handleSaveChanges(item.id)}>Spara</button>
              <button>Ta bort</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
