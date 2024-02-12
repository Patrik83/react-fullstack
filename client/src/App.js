import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { ContextProvider } from "./context/ContextProvider";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Header from "./pages/Header";

const App = () => {
  return (
      <BrowserRouter>
        <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        </ContextProvider>
      </BrowserRouter>
  );
};

export default App;
