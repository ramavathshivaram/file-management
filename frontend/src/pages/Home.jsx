import { SidebarTrigger } from "@/components/ui/sidebar";
import FileExplorer from "@/sections/FileExplorer";
import History from "@/sections/History";
import useUserStore from "@/store/userStore";
import React from "react";
import { Navigate } from "react-router-dom";

const items = [
  { type: "folder", name: "Projects", isImportant: true, isFavorite: false },
  { type: "file", name: "Resume.docx", isImportant: true, isFavorite: true },
  {
    type: "img",
    name: "vacation_photo.png",
    isImportant: false,
    isFavorite: true,
  },
  {
    type: "video",
    name: "presentation.mp4",
    isImportant: true,
    isFavorite: false,
  },
  {
    type: "audio",
    name: "podcast_episode.mp3",
    isImportant: false,
    isFavorite: false,
  },

  { type: "folder", name: "Music", isImportant: false, isFavorite: true },
  { type: "file", name: "Notes.txt", isImportant: true, isFavorite: false },
  { type: "img", name: "profile_pic.jpg", isImportant: true, isFavorite: true },
  {
    type: "video",
    name: "tutorial.mov",
    isImportant: false,
    isFavorite: false,
  },
  { type: "audio", name: "song.mp3", isImportant: true, isFavorite: true },

  { type: "folder", name: "Work", isImportant: true, isFavorite: false },
  { type: "file", name: "invoice.pdf", isImportant: true, isFavorite: false },
  { type: "img", name: "banner.png", isImportant: false, isFavorite: true },
  {
    type: "video",
    name: "meeting_recording.mp4",
    isImportant: true,
    isFavorite: true,
  },
  {
    type: "audio",
    name: "voice_note.wav",
    isImportant: false,
    isFavorite: false,
  },

  { type: "folder", name: "Archive", isImportant: false, isFavorite: false },
  { type: "file", name: "report.docx", isImportant: true, isFavorite: true },
  {
    type: "img",
    name: "screenshot.png",
    isImportant: false,
    isFavorite: false,
  },
  { type: "video", name: "demo.avi", isImportant: false, isFavorite: true },
  {
    type: "audio",
    name: "audiobook.mp3",
    isImportant: true,
    isFavorite: false,
  },
];

const Home = () => {
  const token = localStorage.getItem("token");
  const user = useUserStore((state) => state.user);
  if (!user && !token) {
    return <Navigate to="/login-or-register" />;
  }
  console.log("user in home page", user);
  return (
    <div className="mx-auto w-screen max-w-[1200px]">
      <SidebarTrigger />
      <History />
      <FileExplorer
        rootFolder={
          //user.rootFolder}
          items
        }
      />
    </div>
  );
};

export default Home;
