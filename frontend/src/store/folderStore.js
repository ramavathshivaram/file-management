import { create } from "zustand";

const useFolderStore = create((set) => ({
  pathHistory: [],
  currentFolderId: null,
  setFolders: (folders) => set({ folders }),
  setPathHistory: (history) => set({ pathHistory: history }),
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
  addPathHistory: (folder) =>
    set((state) => ({ pathHistory: [...state.pathHistory, folder] })),
  removeLastPathHistory: () =>
    set((state) => ({ pathHistory: state.pathHistory.slice(0, -1) })),
}));

export default useFolderStore;
