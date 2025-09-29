import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import LoginOrRegister from "./pages/LoginOrRegister";
import { Toaster } from "./components/ui/sonner";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login-or-register" element={<LoginOrRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
