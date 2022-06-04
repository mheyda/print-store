import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/homePage/HomePage.js';
import ShopPage from './routes/shopPage/ShopPage.js';
import DetailPage from './routes/detailPage/DetailPage.js';
import ContactPage from './routes/contactPage/ContactPage.js';
import CartPage from './routes/cartPage/CartPage.js';
import CheckoutPage from './routes/checkoutPage/CheckoutPage.js';
import NavBar from './components/navBar/NavBar.js';


function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} title="Index Page" />
        <Route path="shop" element={<ShopPage />} title="Index Page" />
        <Route path="products/:productName/:productId" element={<DetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
