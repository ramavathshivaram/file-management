import React, { useState } from "react";
import CardComponent from "@/components/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { getFolderContent } from "@/helper/api";

const FileExplorer = ({ rootFolder }) => {
  const [currentFolder, setCurrentFolder] = useState({
    id: null,
    children: rootFolder, // store root as children
  });

  const { data, isLoading } = useQuery({
    queryKey: ["folders", currentFolder.id],
    queryFn: async () => {
      return await getFolderContent(currentFolder.id);
    },
    enabled: currentFolder.id !== null,
  });

  const itemsToShow = currentFolder.id === null ? currentFolder.children : data;

  return (
    <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 overflow-y-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        itemsToShow?.map((item, index) => (
          <CardComponent
            key={item.id || index}
            name={item.name}
            isImportant={item.isImportant}
            isFavorite={item.isFavorite}
            id={item.id}
            type={item.type}
            onClick={() => setCurrentFolder(item)} // navigate deeper
          />
        ))
      )}
    </div>
  );
};

export default FileExplorer;
