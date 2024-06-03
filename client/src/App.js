import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetailPage from "./pages/productdetail/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import Header from "./components/header/Header";
import CategoryPage from "./pages/category/CategoryPage";
import HomePage from "./pages/home/HomePage";
import Admin from "./pages/admin/Admin";

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
