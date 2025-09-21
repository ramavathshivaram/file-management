import { SidebarTrigger } from "@/components/ui/sidebar";
import FileExplorer from "@/sections/FileExplorer";
import History from "@/sections/History";
import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const historydata = [
    { id: 1, name: "Home" },
    { id: 2, name: "Documents" },
    { id: 3, name: "Downloads" },
    { id: 4, name: "Pictures" },
  ];
  return (
    <div>
      <SidebarTrigger />
      <History historydata={historydata} />
      <FileExplorer />
    </div>
  );
};

export default Home;
