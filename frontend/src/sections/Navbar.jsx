import React from "react";
import { Search, User } from "lucide-react";
import { Button } from "../components/ui/button";

import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="border-b h-[6vh] flex items-center justify-around px-4 fixed w-screen z-9 top-0 bg-white">
      {/* Logo / App name */}
      <div>
        <h1 className="font-bold text-xl">File</h1>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 border px-2 rounded w-1/2 relative">
        <Search />
        <SearchBar />
      </div>

      <div className="flex items-center gap-4">
        <User className="cursor-pointer" />
        <Button onClick={() => {
          localStorage.removeItem("token")
          navigate("/login-or-register")
        }
        }>
          {token ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
