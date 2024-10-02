import { create } from 'zustand'

type ChallengeModalState = {
    isOpen: boolean,
    openChallengeModal: () => void;
    closeChallengeModal: () => void;
    toggleOpen: () => void
}

export const useChallengeModalStore = create<ChallengeModalState>((set) => ({
    isOpen: false,
    openChallengeModal: () => set({isOpen: true}),
    closeChallengeModal: () => set({ isOpen: false }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen }))
}))