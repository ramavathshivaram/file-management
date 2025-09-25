import { SidebarTrigger } from "@/components/ui/sidebar";
import FileExplorer from "@/sections/FileExplorer";
import History from "@/sections/History";
import useFolderStore from "@/store/folderStore";
import useUserStore from "@/store/userStore";
import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const user = useUserStore((state) => state.user);
  const addCurrentFolderId = useFolderStore(
    (state) => state.addCurrentFolderId
  );
  console.log(user);
  if (!user && !token) {
    return <Navigate to="/login-or-register" />;
  }
  console.log("user in home page", user);
  addCurrentFolderId(user.rootFolderId);
  return (
    <div className="mx-auto w-screen max-w-[1200px]">
      <SidebarTrigger />
      <History />
      <FileExplorer />
    </div>
  );
};

export default Home;
