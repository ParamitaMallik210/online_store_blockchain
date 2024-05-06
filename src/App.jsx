import React from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar, Navbar } from "./components";
import {
  ProductDetails,
  CreateProduct,
  Home,
  Profile,
  BoughtProduct,
  UserInput,
  UserDetails,
} from "./pages";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#669bbc] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/bought-product" element={<BoughtProduct />} />
          <Route path="/admin-page" element={<UserInput />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
