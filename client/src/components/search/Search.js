import React, { useState, useCallback } from "react";
import { getProducts, getCategories } from "../../services/ApiService";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import styles from "./Search.module.css";
import useApi from "../../hooks/useApi";    

const Search = () => {
    // State för sökord, vald kategori och sökresultat
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');
    const [results, setResults] = useState([]);

    const { data: categories, loaded } = useApi(`http://localhost:3001/categories`);

    // Funktion för att hantera sökningar
    const handleSearch = useCallback(async (event) => {
        const searchValue = event.target.value.trim().toLowerCase();
        setInputValue(searchValue);
        if (searchValue === '') {
            setResults([]);
            return;
        }
        try {
            let searchResults = [];
            if (selectedOption === 'all') {
                const responseData = await getProducts();
                searchResults = responseData.filter(item =>
                    item.name.toLowerCase().includes(searchValue));
            } else {
                const responseData = await getCategories(selectedOption);
                searchResults = responseData.filter(item =>
                    item.name.toLowerCase().includes(searchValue));
            }   
                setResults(searchResults);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [selectedOption]);

    // Funktion för att hantera kategorival
    const handleChange = async (event) => {
        const category = event.target.value;
        setSelectedOption(category);
        console.log("Option selected:", category)

        // Rensa sökfält och sökresultat vid nytt kategorival
        setInputValue('');
        setResults([]);
    };

    // Funktion för att hantera klick på sökresultatet
    const handleClick = () => {
        setInputValue('');
        document.activeElement.blur();
    };

    if (!loaded) {
        return <div>Laddar...</div>
    }

    return (
        <div className={styles.searchWrapper}>
            {/* Sökfält */}
            <input
                className={styles.searchinput}
                type="text"
                placeholder="Sök..."
                value={inputValue}
                onChange={handleSearch}
            />
            {/* Kategoriväljare */}
            <select 
                className={styles.searchDropdown}
                value={selectedOption} 
                onChange={handleChange}
            >
            {/* Visar alla kategorier */}
                <option value="all">Alla</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>

            {/* Visa sökresultat om det finns */}
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

export default Search;