import { create } from 'zustand'

type CreateClassModalState = {
    isOpen: boolean;
    close: () => void;
    open: () => void;
}

export const useCreateClassModal = create<CreateClassModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({isOpen: false})
}))