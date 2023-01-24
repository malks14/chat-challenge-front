import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Chat, ChatsState, ChatTabProps } from '../types/chat';

const initialState: ChatsState = {
  chats: [],
  isAllowedExpand: true,
  isOpenModal: false,
  ticketStatus: 0
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsData: (state, action: PayloadAction<Array<ChatTabProps>>) => {
      state.chats = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload
    },
    setTicketStatus: (state, action: PayloadAction<number>) => {
      state.ticketStatus = action.payload
    }
  }
});

export const { setChatsData, setIsAllowedExpand, setIsOpenModal, setTicketStatus } = chatsSlice.actions;

export const getChats = (state: RootState) => state.chats;
export const getIsAllowedExpand = (state: RootState) => state.chats.isAllowedExpand;
export const getIsOpenModal = (state: RootState) => state.chats.isOpenModal;
export const getTicketStatus = (state: RootState) => state.chats.ticketStatus;

export default chatsSlice.reducer;
