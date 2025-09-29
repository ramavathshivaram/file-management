import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";
import AppSidebar from "../sections/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
