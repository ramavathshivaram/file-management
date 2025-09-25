import { Card, CardHeader } from "./ui/card";

const VideoPlayer = ({ url, poster }) => {
  return (
    <div className="w-full h-full ">
      <Card className="w-full flex items-center justify-center bg-black">
        <CardHeader className="w-full text-center text-white">
          Video Player
        </CardHeader>
        <video
          src={url}
          poster={poster}
          controls
          aria-label="Video player"
          onError={(e) => console.error("Video failed to load:", e)}
          className="w-full h-auto max-h-full aspect-video object-contain"
        >
          Your browser does not support the video tag.
        </video>{" "}
      </Card>
    </div>
  );
};

export default VideoPlayer;
