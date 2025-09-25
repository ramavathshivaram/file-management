import React from "react";
import CardComponent from "@/components/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { getFolderContent } from "@/helper/api";
import useFolderStore from "@/store/folderStore";

const FileExplorer = () => {
  const addPathHistory = useFolderStore((state) => state.addPathHistory);
  const currentFolderId = useFolderStore((state) => state.currentFolderId);
  // const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);


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

  return (
    <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 overflow-y-auto">
      {isLoading || !data?.folder ? (
        <p>Loading...</p>
      ) : data.folder.subFolders?.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-4xl animate-pulse mt-10">
          Nothing Found
        </p>
      ) : (
        data.folder.subFolders.map((folder) => (
          <CardComponent
            key={folder._id}
            name={folder.folderName}
            isFavorite={folder.isFavorite}
            isImportant={folder.isImportant}
            type="folder"
            folderId={folder.folderId}
          />
        ))
      )}
    </div>
  );
};

export default FileExplorer;
