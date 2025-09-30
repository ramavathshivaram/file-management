import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import SearchBar from "@/components/SearchBar";
import UserMenu from "@/components/UserMenu";

const Navbar = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <nav className="border-b fixed top-0 z-50 w-screen shadow-xs bg-white">
      <div className="flex items-center justify-evenly h-[5vh] min-h-13 px-6">
        {/* Left Section */}
        <h1 className="text-2xl uppercase animate-pulse">file</h1>
        {/* search box */}
        <SearchBar />
        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="p-1"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </Button>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
