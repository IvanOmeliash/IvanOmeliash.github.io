import React from "react"
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/main-page"
import MenuPage from "./pages/menu"
import CartPage from "./pages/cart"
import MyOrders from "./pages/my-offer"
import IssuePage from "./pages/issue"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-offer" element={<MyOrders />} />
        <Route path="/issue" element={<IssuePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
