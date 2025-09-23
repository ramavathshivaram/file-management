import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AudioLines,
  Component,
  File,
  Folder,
  Image,
  Star,
  Video,
} from "lucide-react";
import Player from "@/pages/Player";

const cardMap = {
  folder: {
    icon: <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("Folder clicked!"),
  },
  file: {
    icon: <File className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  },
  img: {
    icon: <Image className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  },
  video: {
    icon: <Video className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  },
  audio: {
    icon: <AudioLines className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  },
};

const CardComponent = ({
  name = "Video",
  isFavorite = false,
  isImportant = true,
  type = "folder",
  id = 1,
}) => {
  const [model, setModel] = useState(false);
  return (
    <Card
      className="w-full aspect-square gap-0 hover:shadow-lg transition-shadow group/card"
      onClick={
        cardMap[type]?.onClickFnc ||
        (() => {
          setModel(true);
        })
      }
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
        {cardMap[type]?.icon || (
          <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />
        )}
      </CardContent>

      <CardFooter className="text-center">
        <CardTitle className="truncate">{name}</CardTitle>
      </CardFooter>
      {model && (
        <Player
          URL={"https://www.youtube.com/watch?v=RlPNh_PBZb4"}
          type={"video"}
          setModel={setModel}
        />
      )}
    </Card>
  );
};

export default CardComponent;
