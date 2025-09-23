import { Card } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import { X } from "lucide-react";
import React from "react";

const Player = ({ URL, type, setModel }) => {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center fixed top-0 left-0 bg-black/15 bg-opacity-50 z-50">
      <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
        <X
          onClick={() => {
            console.log("clicked");
            setModel(false)
          }
          }
          className="absolute -top-3 -right-3 w-8 h-8 text-red-700 cursor-pointer bg-white rounded-4xl"
        />
        <Card className="w-full h-full p-5">
          {type === "video" && <VideoPlayer url={URL} poster="/poster.jpg" />}
          {type === "audio" && <audio src={URL} className="w-full " controls />}
          {type === "image" && (
            <img
              src={URL}
              alt="Image"
              className="w-full h-full object-contain"
            />
          )}
          {/* type == pdf */}
        </Card>
      </div>
    </div>
  );
};

export default Player;
