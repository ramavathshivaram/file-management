import React from "react";
import Home from "./Home";
import Navbar from "@/sections/Navbar";

const RootLayout = () => {
  return (
    <div className="w-screen bg-[url(bg_img.jpg)] h-screen bg-cover">
      <Navbar />
      <Home />
    </div>
  );
};

export default RootLayout;
