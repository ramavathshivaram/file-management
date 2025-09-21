import zustand from 'zustand'

const useUserStore = zustand((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))