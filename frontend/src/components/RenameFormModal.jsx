import { renameFolder } from "@/helper/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSelectStore from "@/store/selectStore";
import { toast } from "sonner";
import useFolderStore from "@/store/folderStore";

const RenameFormModal = ({ setRenameModal }) => {
  const queryClient = useQueryClient();
  const selectedItems = useSelectStore((state) => state.selectedItems);
  const currentFolderId = useFolderStore((state) => state.currentFolderId);
  const [newFolderName, setNewFolderName] = useState("");
  console.log("currdent folder", selectedItems[0]);

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: (data) => renameFolder(data),
    onSuccess: (res) => {
      console.log("Folder renamed:", res);
      toast.success("Folder renamed");
      // ✅ Clear input
      setNewFolderName("");
      // ✅ Close modal
      setRenameModal(false);
      //todo return the parentId then invalid parentid
      queryClient.invalidateQueries(["folders", selectedItems[0]]);
    },
    onError: (error) => {
      console.error("Error creating folder:", error);
    },
  });

  const handleRenameFolder = (e) => {
    e.preventDefault();
    console.log("folder name:", newFolderName);
    mutation.mutate({
      folderId: selectedItems[0],
      newFolderName,
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
          <h2 className="text-lg font-semibold mb-4">Rename Folder</h2>
          <form onSubmit={handleRenameFolder}>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New Folder Name"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => setRenameModal(false)}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Renaming..." : "Rename"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RenameFormModal;
