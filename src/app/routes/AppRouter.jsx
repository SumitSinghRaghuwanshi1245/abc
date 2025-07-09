import React, { lazy } from 'react'
import Home from "../../pages/Home";

import OrderSucessPlaced from "../../pages/OrderSuccessPlaced";
import { Route, Routes } from 'react-router-dom';


const AppRouter = () => {

const About = lazy(() => import("../../pages/About"));
const Deals = lazy(() => import("../../pages/Deals"));
const Search = lazy(() => import("../../pages/Search"));
const Product = lazy(() => import("../../pages/Product"));
const Contact = lazy(() => import("../../pages/Contact"));
const Login = lazy(() => import("../../pages/auth/Login"));
const Checkout = lazy(() => import("../../pages/Checkout"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const Categories = lazy(() => import("../../pages/Categories"));
const Account = lazy(() => import("../../pages/account/Account"));
const CategoriesTag = lazy(() => import("../../pages/CategoriesTag"));

  return (
    <>
      <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Login />} />
    <Route path="/categories/:categoryTag" element={<CategoriesTag />} />
    <Route path="/categories/:categoryTag/:productId" element={<Product />} />
    <Route path="/:productId" element={<Product />} />
    <Route path="/products/:productId" element={<Product />} />
    <Route path="/search" element={<Search />} />
    <Route path="/search/:productId" element={<Product />} />
    <Route path="/search/:productId" element={<Product />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/buy-now/:productId" element={<Checkout />} />
    <Route path="/account" element={<Account />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact-us" element={<Contact />} />
    <Route path="/deals" element={<Deals />} />
    <Route path="/deals/:productId" element={<Product />} />
    <Route path="/order-successfull" element={<OrderSucessPlaced />} />
    <Route path="/deals/:productId" element={<Product />} />
    <Route path="/order-successfull" element={<OrderSucessPlaced />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
    </>
  )
}

export default AppRouter
