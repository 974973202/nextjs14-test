import { createWithEqualityFn } from 'zustand/traditional'

interface launchpadState {
  show: boolean
  setShow: (v: boolean) => void
}

const useLaunchpadStore = createWithEqualityFn<launchpadState>(set => ({
  show: false,
  setShow: v => set(() => ({ show: v })),
}))

export default useLaunchpadStore
