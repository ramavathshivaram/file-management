import { createFolder } from "@/helper/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import useFolderStore from "@/store/folderStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateFolderForm = ({ setCreateFolderFormOpen }) => {
  const queryClient = useQueryClient();
  const currentFolderId = useFolderStore((state) => state.currentFolderId);
  const [folderName, setFolderName] = useState("");
  console.log("currdent folder",currentFolderId)

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: (data) => createFolder(data),
    onSuccess: (res) => {
      console.log("Folder created:", res);

      // ✅ Clear input
      setFolderName("");

      // ✅ Close modal
      setCreateFolderFormOpen(false);

      // ✅ Refetch folders for current folder
      queryClient.invalidateQueries(["folders", currentFolderId]);
    },
    onError: (error) => {
      console.error("Error creating folder:", error);
    },
  });

  const handleCreateFolder = (e) => {
    e.preventDefault();
    mutation.mutate({
      folderName,
      parentFolderId: currentFolderId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h2 className="text-lg font-semibold mb-4">Create New Folder</h2>
          <form onSubmit={handleCreateFolder}>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder Name"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => setCreateFolderFormOpen(false)}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateFolderForm;
