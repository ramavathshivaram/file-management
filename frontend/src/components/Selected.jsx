import useSelectStore from "@/store/selectStore";
import useFolderStore from "@/store/folderStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/helper/api";
import React, { useState } from "react";
import { Button } from "./ui/button";
import RenameFormModal from "./RenameFormModal";

const Selected = () => {
  const selectedItems = useSelectStore((state) => state.selectedItems);
  console.log("selected",selectedItems)
  const clearAllSelectedItems = useSelectStore(
    (state) => state.clearAllSelectedItems
  );
  const currentFolderId = useFolderStore((state) => state.currentFolderId);
  const queryClient = useQueryClient();

  // Mutation function for a single folder
  const deleteMutation = useMutation({
    mutationFn: async ({ folderId }) =>
      deleteFolder({ folderId, parentFolderId: currentFolderId }),
  });

  const handleDelete = async () => {
    try {
      // Run all delete requests in parallel
      await Promise.all(
        selectedItems.map((item) =>
          deleteMutation.mutateAsync({ folderId: item })
        )
      );
      clearAllSelectedItems();
      

      // Refresh the folders list after all deletions
      queryClient.invalidateQueries(["folders", currentFolderId]);
    } catch (error) {
      console.error("Some folders could not be deleted:", error);
    }
  };

  return (
    <div className="flex justify-end gap-2 w-full pe-2">
      <Button onClick={handleDelete} disabled={deleteMutation.isLoading}>
        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
      </Button>
      {selectedItems.length === 1 && <Rename />}
    </div>
  );
};

export default Selected;

const Rename = () => {
  const [renameModal, setRenameModal] = useState(false);
  return (
    <>
      <Button onClick={() => setRenameModal(true)}>Rename</Button>
      {renameModal && <RenameFormModal setRenameModal={setRenameModal} />}
    </>
  );
};
