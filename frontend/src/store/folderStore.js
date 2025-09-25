import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFolderStore = create(
  persist(
    (set) => ({
      pathHistory: [],
      currentFolderId: null,

      addPathHistory: (folder) =>
        set((state) => {
          console.log("add Path ", folder);
          const exists = state.pathHistory.some((f) => f.id === folder.id);
          if (exists) return state;

          return {
            currentFolderId: folder.id,
            pathHistory: [...state.pathHistory, folder],
          };
        }),

      removeLastPathHistory: () =>
        set((state) => {
          const newHistory = state.pathHistory.slice(0, -1);
          return {
            currentFolderId:
              newHistory.length > 0
                ? newHistory[newHistory.length - 1].id
                : null,
            pathHistory: newHistory,
          };
        }),

      removeAfterFolderId: (folderId) =>
        set((state) => {
          const index = state.pathHistory.findIndex((f) => f.id === folderId);

          if (index === -1) {
            return state;
          }

          return {
            currentFolderId: folderId,
            pathHistory: state.pathHistory.slice(0, index + 1),
          };
        }),
    }),
    {
      name: "folder-store", // 👈 key for localStorage
    }
  )
);

export default useFolderStore;
