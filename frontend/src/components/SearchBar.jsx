import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Folder, File, Image, Video, AudioLines } from "lucide-react";

const SearchBar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const iconMap = {
    folder: <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    file: <File className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    img: <Image className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    video: <Video className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
    audio: <AudioLines className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />,
  };
  const dummy = [
    { id: 1, name: "Work Projects", type: "folder" },
    { id: 2, name: "Resume.docx", type: "file" },
    { id: 3, name: "Vacation.png", type: "img" },
    { id: 4, name: "Meeting.mp4", type: "video" },
    { id: 5, name: "Podcast.mp3", type: "audio" },
    { id: 6, name: "Designs", type: "folder" },
    { id: 7, name: "Report.pdf", type: "file" },
    { id: 8, name: "Family.jpg", type: "img" },
    { id: 9, name: "Tutorial.mov", type: "video" },
    { id: 10, name: "Song.wav", type: "audio" },
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setOpen(false);
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const delayDebounceFn = setTimeout(() => {
      try {
        const results = dummy.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setData(results);
        setOpen(true);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong!", error);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="flex items-center space-x-4 flex-1">
      <div className="relative flex-1">
        {/* Search input */}
        <motion.div
          animate={{
            width: searchFocused ? 400 : 300,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative"
        >
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="pl-10 pr-10 bg-input-background border-0 focus:ring-2 focus:ring-ring"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dropdown results */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-12 left-0 w-full max-w-md  z-50"
            >
              <Card className="p-1">
                {loading && (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}
                {!loading && !error && data.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No results found.
                  </p>
                )}
                {!loading && !error && data.length > 0 && (
                  <ul
                    className="space-y-2 max-h-60 overflow-y-auto"
                    role="listbox"
                  >
                    {data.map((item) => (
                      <li
                        key={item.id}
                        role="option"
                        className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                        onMouseDown={() => {
                          setSearchQuery(item.name); // set only the name
                          setOpen(false);
                        }}
                      >
                        <span className="w-5 h-5 flex items-center justify-center">
                          {iconMap[item.type]}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
