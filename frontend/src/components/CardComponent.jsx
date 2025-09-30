import React, { useState, useRef, useCallback, useMemo } from "react";
import { Folder, File, Image, Video, AudioLines } from "lucide-react";
import Player from "@/pages/Player";
import useFolderStore from "@/store/folderStore";
import { useSelectable } from "@/hooks/useSelectable";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const iconComponents = {
  folder: Folder,
  file: File,
  img: Image,
  video: Video,
  audio: AudioLines,
};

const CardComponent = ({
  folderName,
  type = "folder",
  folderId,
  setDragFolderId,
  setDragTargetId,
  handleDragEnd,
  dragFolderId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCurrentFolderId = useFolderStore(
    (state) => state.addCurrentFolderId
  );
  const { isSelected, toggleSelect, isPathChangeable } =
    useSelectable(folderId);
  const Icon = useMemo(() => iconComponents[type] || Folder, [type]);

  const clickTimeout = useRef(null);

  const handleDoubleClick = useCallback(() => {
    if (isPathChangeable) return;

    if (type === "folder") {
      addCurrentFolderId(folderId);
    } else {
      setIsModalOpen(true);
    }
  }, [isPathChangeable, type, folderId, addCurrentFolderId, setIsModalOpen]);

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
    <motion.div
      className={cn(
        `border-2 p-2 rounded-lg w-full cursor-pointer bg-white/60 ${
          isSelected ? "bg-blue-200/70 border-blue-400 border-2" : ""
        }`
      )}
      onClick={handleClick}
      draggable={true}
      onDragStart={() => setDragFolderId(folderId)}
      onDragOver={() => setDragTargetId(folderId)}
      onDragEnd={handleDragEnd}
      // animation
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 0.9 }}
    >
      <Icon className="w-4/5 h-4/5 text-gray-700 mx-auto" strokeWidth={0.5} />

      <h1 className="truncate text-lg font-medium ">{folderName}</h1>

      {isModalOpen && (
        <Player
          URL="https://www.youtube.com/watch?v=RlPNh_PBZb4"
          type={type}
          setModel={setIsModalOpen}
        />
      )}
    </motion.div>
  );
};

export default CardComponent;
