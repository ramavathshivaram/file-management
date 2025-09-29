import Selected from "@/components/Selected";
import { SidebarTrigger } from "@/components/ui/sidebar";
import FileExplorer from "@/sections/FileExplorer";
import History from "@/sections/History";
import useFolderStore from "@/store/folderStore";
import useSelectStore from "@/store/selectStore";
import useUserStore from "@/store/userStore";
import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const user = useUserStore((state) => state.user);
  const addCurrentFolderId = useFolderStore(
    (state) => state.addCurrentFolderId
  );
  const selectedItems = useSelectStore((state) => state.selectedItems);
  // const clearAllSelectedItems = useSelectStore(
  //   (state) => state.clearAllSelectedItems
  // );

  // clearAllSelectedItems();

  if (!user && !token) {
    return <Navigate to="/login-or-register" />;
  }
  addCurrentFolderId(user.rootFolderId);
  return (
    <div className="mx-auto  w-screen max-w-[1300px] select-none h-[95vh]">
      <div className="flex h-13 items-center border-b">
        {selectedItems.length === 0 ? <History /> : <Selected />}
      </div>
      <FileExplorer />
    </div>
  );
};

export default Home;
