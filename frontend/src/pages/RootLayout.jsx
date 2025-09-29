import React from "react";
import Home from "./Home";
import Navbar from "@/sections/Navbar";

const RootLayout = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <Home />
    </div>
  );
};

export default RootLayout;
