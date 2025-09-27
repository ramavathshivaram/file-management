import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSelectStore = create(
  persist(
    (set) => ({
      selectedItems: [], 

      addSelectedItem: (folderId) =>
        set((state) => ({
          selectedItems: state.selectedItems.includes(folderId)
            ? state.selectedItems
            : [...state.selectedItems, folderId],
        })),

      removeSelectedItem: (folderId) =>
        set((state) => ({
          selectedItems: state.selectedItems.filter((id) => id !== folderId),
        })),

      clearAllSelectedItems: () => set({ selectedItems: [] }),
    }),
    {
      name: "select-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useSelectStore;
