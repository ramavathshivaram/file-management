import React, { useState, useRef, useCallback } from "react";
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
  Heart,
  Paperclip,
} from "lucide-react";
import Player from "@/pages/Player";
import useFolderStore from "@/store/folderStore";
import useSelectStore from "@/store/selectStore";
import { toast } from "sonner";
import { useSelectable } from "@/hooks/useSelectable";

const iconMap = {
  folder: <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  file: <File className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  img: <Image className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  video: <Video className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  audio: <AudioLines className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
};

const CardComponent = ({
  folderName,
  isFavorite = false,
  isImportant = false,
  type = "folder",
  folderId,
  setDragFolderId,
  setDragTargetId,
  handleDragEnd,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCurrentFolderId = useFolderStore(
    (state) => state.addCurrentFolderId
  );
  const { isSelected, toggleSelect, isPathChangeble } = useSelectable(folderId);

  const clickTimeout = useRef(null);

  const handleDoubleClick = useCallback(() => {
    if (!isPathChangeble) return;

    if (type === "folder") {
      addCurrentFolderId(folderId);
    } else {
      setIsModalOpen(true);
    }
  }, [isPathChangeble, type, folderId, addCurrentFolderId, setIsModalOpen]);

  // Handle click vs double-click
  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleDoubleClick();
    } else {
      clickTimeout.current = setTimeout(() => {
        toggleSelect();
        clickTimeout.current = null;
      }, 250); // to activate dbl click it tooks morethan 200ms
    }
  };

  return (
    <Card
      className={`w-full bg-white aspect-square gap-0 hover:shadow-lg transition-shadow group/card cursor-pointer p-0 ${
        isSelected ? "bg-blue-200 border-blue-400 border-2" : ""
      }`}
      onClick={handleClick}
      draggable={true}
      onDrag={() => setDragFolderId(folderId)}
      onDragOver={() => setDragTargetId(folderId)}
      onDragEnd={handleDragEnd}
    >
      <CardHeader className="flex justify-end group-hover/card:opacity-100 opacity-0 mt-2 px-2">
        <Paperclip
          className={
            isImportant
              ? "text-blue-600 fill-blue-600 transition-colors size-5"
              : "text-gray-500 hover:text-blue-600 transition-colors size-5"
          }
        />
        <Heart
          className={
            isFavorite
              ? "text-red-500  fill-red-600 transition-colors size-5"
              : "text-gray-500 hover:text-red-600 transition-colors size-5"
          }
        />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center -mt-5 p-0">
        {iconMap[type] || (
          <Folder className="size-5 text-gray-600 m-0 p-0" strokeWidth={1} />
        )}
      </CardContent>

      <CardFooter className="text-center mb-2 -mt-3">
        <CardTitle className="truncate">{folderName}</CardTitle>
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
