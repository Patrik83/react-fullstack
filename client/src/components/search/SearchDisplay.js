import React, { useState } from "react";
import styles from "./Search.module.css";

const SearchDisplay = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
    };

  return (
    <div className={styles.searchWrapper}>
        <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
        >
            <option value="all">Alla</option>
            {/* Loop through categories */}
            {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
            ))}
        </select>
    </div>
  );
};

export default SearchDisplay;