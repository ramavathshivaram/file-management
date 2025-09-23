import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Upload,
  Bell,
  User,
  ChevronDown,
  Moon,
  Sun,
  X,
  FolderPlus,
  FileUp,
  Link,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import SearchBar from "@/components/SearchBar";
import Notifications from "@/components/Notifications";
import UserMenu from "@/components/UserMenu";

const Navbar = ({ isDarkMode, onToggleDarkMode }) => {



  return (
    <motion.header
      initial={false}
      animate={{
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      }}
      className="bg-background border-b border-border sticky top-0 z-50 transition-shadow duration-200"
    >
      <div className="flex items-center justify-evenly w-screen h-16 px-6">
        {/* Left Section */}
        <h1 className="text-2xl uppercase ">file</h1>
        {/* search box */}
        <SearchBar />
        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Upload Button */}

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="p-2"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </Button>

          {/* Notifications */}
          <Notifications />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
