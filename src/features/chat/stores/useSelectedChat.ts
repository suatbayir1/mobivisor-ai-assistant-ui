// features/chat/store/useSelectedChat.ts
import { create } from 'zustand';

type SelectedChatState = {
  chatUuid: string | null;
  setChatUuid: (uuid: string | null) => void;
};

export const useSelectedChat = create<SelectedChatState>((set) => ({
  chatUuid: null,
  setChatUuid: (uuid) => set({ chatUuid: uuid }),
}));
