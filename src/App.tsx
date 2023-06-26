import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductData from "./components/productpage/ProductData";
import Description from "./components/descriptionpage/Description";
import MenClothing from "./components/menclothing/MenClothing";
import "./App.css";
import Cart from "./components/cart/Cart";
import Login from "./components/loginregister.tsx/Login";
import Register from "./components/loginregister.tsx/Register";
import ProtectedRoute from "./components/loginregister.tsx/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <ProductData />
            // </ProtectedRoute>
          }
        />
        <Route path="/product/:productId" element={<Description />} />
        <Route
          path="/specificproduct"
          element={
            // <ProtectedRoute>
              <MenClothing />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            // <ProtectedRoute>
              <Cart />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
