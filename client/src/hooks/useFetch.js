import { useState, useEffect } from "react";

const useFetch = (fetchProducts, ...args) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productsData = await fetchProducts(...args);
                setData(productsData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchProducts, ...args]);
    
    return { data, loading };
};

export default useFetch;