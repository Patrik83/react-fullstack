import React from "react";
import { useParams } from "react-router-dom";
import CategoryList from "../../components/categorylist/CategoryList";
import useApi from "../../hooks/useApi";

const CategoryPage = () => {
    let { categoryName } = useParams();
    const { data: products, loaded } = useApi(`http://localhost:3001/categories/${categoryName}`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

    if (!products) {
      return <div>Inga produkter hittades</div>;
    }

    console.log("categoryName:", categoryName);

    return (
      <div>
        <CategoryList products={products} categoryName={categoryName} />
      </div>
    );
};

export default CategoryPage;