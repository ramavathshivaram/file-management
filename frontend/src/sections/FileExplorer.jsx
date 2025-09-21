import React from "react";
import CardComponent from "@/components/CardComponent";

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

const FileExplorer = () => {
  return (
    <div className="w-full h-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {items.map((item, index) => (
        <CardComponent
          key={index}
          name={item.name}
          isImportant={item.isImportant}
          isFavorite={item.isFavorite}
          id={index}
          type={item.type}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
