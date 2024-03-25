import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/productdetail/ProductDetail";
import ProductList from "./pages/productlist/ProductList";
import Cart from "./pages/cart/Cart";
import Header from "./pages/header/Header";
import { Search } from "./pages/Search";
import { CategoryPage } from "./pages/Categories";

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
