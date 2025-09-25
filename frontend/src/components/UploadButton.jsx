import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CreateFolderForm from "../components/CreateFolderForm";
import { Upload, ChevronDown, FileUp, FolderPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadModal } from "@/sections/UploadModal";

const UploadButton = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [createFolderFormOpen, setCreateFolderFormOpen] = useState(false);
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center">
            <Upload size={16} className="mr-2" />
            Upload
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              onClick={() => setUploadModal(true)}
              variant="ghost"
              className="w-full justify-start"
            >
              <FileUp size={16} className="mr-2" />
              Upload Files
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={() => setCreateFolderFormOpen(true)}
              variant="ghost"
              className="w-full justify-start"
            >
              <FolderPlus size={16} className="mr-2" />
              New Folder
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {uploadModal && <UploadModal onClose={() => setUploadModal(false)} />}
      {createFolderFormOpen && (
        <CreateFolderForm setCreateFolderFormOpen={setCreateFolderFormOpen} />
      )}
    </div>
  );
};

export default UploadButton;
