import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import LoginOrRegister from "./pages/LoginOrRegister";
import { Toaster } from "./components/ui/sonner";
import Shared from "./pages/Shared";
import Recent from "./pages/Recent";
import Favorites from "./pages/favorites";
import Tags from "./pages/Tags";
import Important from "./pages/Important";
import Trash from "./pages/Trash";
import Setting from "./pages/Setting";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/important" element={<Important />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/setting" element={<Setting />} />
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
