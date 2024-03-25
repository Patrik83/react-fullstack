import React, { createContext, useState } from "react";
import { searchProducts } from "../services/ApiService";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async (searchQuery) => {
        if (searchQuery !== '') {
            try {
                // Anropa sökfunktionen med sökfrågan
                const data = await searchProducts(searchQuery);
                setSearchResults(data);
            } catch (error) {
                console.error("Error searching products:", error);
                // Hantera fel här om det behövs
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <SearchContext.Provider value={{ searchResults, fetchData }}>
            {children}
        </SearchContext.Provider>
    );
};
