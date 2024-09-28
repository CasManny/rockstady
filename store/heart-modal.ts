import { create } from 'zustand'

type HeartModalState = {
    isOpen: boolean,
    openHeartModal: () => void;
    closeHeartModal: () => void;
}

export const useHeartModalStore = create<HeartModalState>((set) => ({
    isOpen: false,
    openHeartModal: () => set({isOpen: true}),
    closeHeartModal: () => set({ isOpen: false})
}))