import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AudioLines, Component, File, Folder, Image, Star, Video } from "lucide-react";

const cardMap = {
  folder: {
    icon: <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("Folder clicked!"),
  },
  file: {
    icon: <File className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("File clicked!"),
  },
  img: {
    icon: <Image className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("Image clicked!"),
  },
  video: {
    icon: <Video className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("Video clicked!"),
  },
  audio: {
    icon: <AudioLines className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    onClickFnc: () => alert("Audio clicked!"),
  },
};

const CardComponent = ({
  name = "Video",
  isFavorite = false,
  isImportant = true,
  type = "folder",
  id = 1,
}) => {
  return (
    <Card className="w-full aspect-square gap-0 hover:shadow-lg transition-shadow">
      <CardHeader className="flex justify-end">
        {isImportant ? (
          <Component className="text-red-500 fill-red-500 transition-colors" />
        ) : (
          <Component className="text-gray-500 hover:text-red-400 transition-colors" />
        )}
        {isFavorite ? (
          <Star className="fill-yellow-500 text-yellow-500 transition-colors" />
        ) : (
          <Star className="text-gray-500 hover:text-yellow-400 transition-colors" />
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {cardMap[type]?.icon || (
          <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />
        )}
      </CardContent>

      <CardFooter className="text-center">
        <CardTitle>{name}</CardTitle>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
