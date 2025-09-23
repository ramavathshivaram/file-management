import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../sections/Navbar'
import AppSidebar from "../sections/AppSidebar";
import { SidebarProvider } from '@/components/ui/sidebar';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <SidebarProvider className="h-screen">
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
      
    </div>
  );
}

export default RootLayout
