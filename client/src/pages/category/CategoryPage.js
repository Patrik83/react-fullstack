import React from "react";
import { useParams } from "react-router-dom";
import CategoryList from "../../components/categorylist/CategoryList";
import useApi from "../../hooks/useApi";

const CategoryPage = () => {
    let { categoryName } = useParams();
    const { data: products, loaded } = useApi(`http://localhost:3001/products/category/${categoryName}`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

    if (!products) {
      return <div>Inga produkter hittades</div>;
    }

    return (
      <div>
        <CategoryList products={products} />
      </div>
    );
};

export default CategoryPage;