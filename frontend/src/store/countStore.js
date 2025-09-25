import { create } from "zustand";

const useCountStore = create((set) => ({
  rootFolderCount: 0,
  importantItemsCount: 0,
  favoriteItemsCount: 0,
  recentItemsCount: 0,
  trashedItemsCount: 0,
  storageUsed: 0,
  storageLimit: 0,
  setImportantItemsCount: (count) => set({ importantItemsCount: count }),
  setFavoriteItemsCount: (count) => set({ favoriteItemsCount: count }),
  setRecentItemsCount: (count) => set({ recentItemsCount: count }),
  setTrashedItemsCount: (count) => set({ trashedItemsCount: count }),
  setStorageUsed: (used) => set({ storageUsed: used }),
  setStorageLimit: (limit) => set({ storageLimit: limit }),
  setRootFolderCount: (count) => set({ rootFolderCount: count }),
}));

export default useCountStore;
