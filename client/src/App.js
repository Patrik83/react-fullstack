import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Header from "./pages/Header";

const App = () => {

  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
  </BrowserRouter>
  );
};

export default App;
