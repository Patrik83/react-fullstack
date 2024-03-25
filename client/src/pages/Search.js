import React, { useState, useEffect } from "react";
import { searchProducts } from "../services/ApiService";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Filtrera sökresultaten baserat på starten av produktnamnet
    useEffect(() => {
    
    if (!searchQuery.trim()) { // Kontrollera om sökfrågan är tom
        setSearchResults([]); // Om sökfrågan är tom, rensa sökresultaten
        return;
    }

    const fetchData = async () => {
        try {
            // Anropa sökfunktionen med sökfrågan
            const data = await searchProducts(searchQuery);
            setSearchResults(data);
        }   catch (error) {
            console.error("Error searching products:", error);
            // Hantera fel här om det behövs
        }
    };
    fetchData();
    }, [searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <ul>
            {searchResults
                    .filter(result =>
                        result.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrera baserat på produktnamnet
                    )
                    .map((result) => (
                        <li key={result.id}>{result.name} {result.price}</li>
                    ))}
            </ul>
        </div>
    );
};
