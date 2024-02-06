import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";

const App = () => {
  return (
      <BrowserRouter>
        <CartProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>
  );
};

export default App;
