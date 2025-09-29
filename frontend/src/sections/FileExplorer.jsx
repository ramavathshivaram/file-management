import React, { useState } from "react";
import CardComponent from "@/components/CardComponent";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getFolderContent, moveFolder } from "@/helper/api";
import useFolderStore from "@/store/folderStore";
import CardComponentSkeleton from "@/components/skeleton/cardComponentSkeleton";

const FileExplorer = () => {
  const queryClient = new QueryClient();
  const addPathHistory = useFolderStore((state) => state.addPathHistory);
  const currentFolderId = useFolderStore((state) => state.currentFolderId);
  const [dragFolderId, setDragFolderId] = useState(null);
  const [dragTargetId, setDragTargetId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["folders", currentFolderId],
    queryFn: async () => {
      const res = await getFolderContent(currentFolderId);
      console.log("fecthed folder content", res);
      addPathHistory({
        id: res.folder._id,
        name:
          res.folder.folderName === "rootFolder"
            ? "Home"
            : res.folder.folderName,
      });
      return res;
    },
    keepPreviousData: true,
  });
  const handleDragEnd = async () => {
    if (dragFolderId == dragTargetId) {
      setDragFolderId(null);
      setDragTargetId(null);
      return;
    }
    const moveFolderObj = {
      folderId: dragFolderId,
      parentFolderId: currentFolderId,
      targetId: dragTargetId,
    };
    await moveFolder(moveFolderObj);
    queryClient.invalidateQueries(["folders", currentFolderId]);
    setDragFolderId(null);
    setDragTargetId(null);
  };

  return (
    <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 overflow-y-auto overflow-x-none h-full">
      {isLoading || !data?.folder ? (
        [1, 1, 1, 1, 1].map((ele, idx) => <CardComponentSkeleton key={idx} />)
      ) : data.folder.subFolders?.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-4xl animate-pulse mt-10">
          Nothing Found
        </p>
      ) : (
        data.folder.subFolders.map((folder) => (
          <CardComponent
            key={folder.folderId}
            {...folder}
            setDragFolderId={setDragFolderId}
            setDragTargetId={setDragTargetId}
            handleDragEnd={handleDragEnd}
            dragFolderId={dragFolderId}
          />
        ))
      )}
    </div>
  );
};

export default FileExplorer;
