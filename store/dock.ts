import { createWithEqualityFn } from 'zustand/traditional'

interface dockState {
  dockSize: number
  dockMag: number
  setDockSize: (v: number) => void
  setDockMag: (v: number) => void
}

const useDockStore = createWithEqualityFn<dockState>(set => ({
  dockSize: 50,
  dockMag: 2,
  setDockSize: v => set(() => ({ dockSize: v })),
  setDockMag: v => set(() => ({ dockSize: v })),
}))

export default useDockStore
