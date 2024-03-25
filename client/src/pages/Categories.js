import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../services/ApiService";

export function CategoryPage() {
    let { categoryName } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        
        const fetchCategoryProducts = async () => {
            try {
                const productData = await getProductsByCategory(categoryName);
                setCategoryProducts(productData);
            } catch (error) {
                console.error(`Error Fetching ${categoryName} products:`, error);
            }
        };
        
        fetchCategoryProducts();
    }, [categoryName]);

    // Om categoryProducts är null eller tom, returnera en laddningsindikator eller ett meddelande.
    if (!categoryProducts || categoryProducts.length === 0) {
        return <div>Hittade inga produkter i kategorin</div>;
    }

    return (
        <div>
            <h2>{categoryName}</h2>
            <ul>
                {categoryProducts.map((product) => (
                    <li key={product.id}>{product.name}{product.price}<img src={`/images/${product.Images[0].imageUrl}`} alt={`Bild 1`} /></li>
                    
                ))}
            </ul>
            <Link to="/">Till startsidan</Link>
        </div>
    );
}