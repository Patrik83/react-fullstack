import React, { useState, useCallback } from "react";
import { getProductsByCategory, getProducts } from "../../services/ApiService";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import styles from "./Search.module.css";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [results, setResults] = useState([]);

    const handleSearch = useCallback(async (event) => {
        const term = event.target.value.trim();
        setSearchTerm(term);
        if (term === '') {
            setResults([]);
            return;
        }
        try {
            let filteredResults = [];
            if (selectedCategory === 'all') {
                const allProducts = await getProducts();
                filteredResults = allProducts.filter(result =>
                    result.name.toLowerCase().includes(term.toLowerCase()));
            } else {
                const categoryProducts = await getProductsByCategory(selectedCategory);
                filteredResults = categoryProducts.filter(result =>
                    result.name.toLowerCase().includes(term.toLowerCase()));
            }
            setResults(filteredResults);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [selectedCategory]);

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        // Rensa sökfält och sökresultat vid nytt kategorival
        setSearchTerm('');
        setResults([]);
    };

    const handleClick = () => {
        setSearchTerm('');
        document.activeElement.blur();
    };

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Sök..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchinput}
            />
            <select style={{border: "1px solid black", backgroundColor: "#fff", height: "30px", width: "20px"}} value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">Alla</option>
                <option value="Tröjor">Tröjor</option>
                <option value="Telefoner">Telefoner</option>
            </select>

            {results.length > 0 && (
                <div className={styles.resultsContainer}>
                    <ul className={styles.resultsList}>
                        {results.map((result) => (
                            <li key={result.id}>
                                <SearchIcon fontSize="small"/>
                                <Link to={`/product/${result.id}`} onClick={handleClick}>
                                    {result.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
