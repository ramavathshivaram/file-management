import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Folder,
  File,
  Image,
  Video,
  AudioLines,
  Star,
  Component,
} from "lucide-react";
import Player from "@/pages/Player";
import useFolderStore from "@/store/folderStore";

const CardComponent = ({
  name,
  isFavorite = false,
  isImportant = false,
  type = "folder",
  folderId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCurrentFolderId = useFolderStore(
    (state) => state.addCurrentFolderId
  );

  const handleClick = () => {
    if (type === "folder") {
      addCurrentFolderId(folderId);
    } else {
      setIsModalOpen(true);
    }
  };

  const iconMap = {
    folder: <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    file: <File className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    img: <Image className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    video: <Video className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    audio: <AudioLines className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  };

  return (
    <Card
      className="w-full aspect-square gap-0 hover:shadow-lg transition-shadow group/card"
      onClick={handleClick}
    >
      <CardHeader className="flex justify-end group-hover/card:opacity-70 opacity-0 -mt-4">
        <Component
          className={
            isImportant
              ? "text-red-500 fill-red-500 transition-colors"
              : "text-gray-500 hover:text-red-400 transition-colors"
          }
        />
        <Star
          className={
            isFavorite
              ? "fill-yellow-500 text-yellow-500 transition-colors"
              : "text-gray-500 hover:text-yellow-400 transition-colors"
          }
        />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {iconMap[type] || (
          <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />
        )}
      </CardContent>

      <CardFooter className="text-center">
        <CardTitle className="truncate">{name}</CardTitle>
      </CardFooter>

      {isModalOpen && (
        <Player
          URL="https://www.youtube.com/watch?v=RlPNh_PBZb4"
          type={type}
          setModel={setIsModalOpen}
        />
      )}
    </Card>
  );
};

export default CardComponent;
