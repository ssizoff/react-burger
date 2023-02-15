import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderShort } from '../../utils/burger-api';
import { TSocketActions } from '../socketMiddleware';

export type TSocketMessage = {
    success: boolean;
    orders?: TOrderShort[];
    total?: number;
    totalToday?: number;
};

export type TSocketState = {
    readyState: number;
    messages: TSocketMessage[];
    lastMessage?: TSocketMessage;
    orders: TOrderShort[];
    total: number;
    totalToday: number;
};

export const initialState: TSocketState = {
    readyState: -1,
    messages: [],
    orders: [],
    total: 0,
    totalToday: 0,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setReadyState: (state, action: PayloadAction<number>) => {
            state.readyState = action.payload;
        },
        receiveSocketMessage: (
            state,
            { payload: message }: PayloadAction<TSocketMessage>
        ) => {
            if (message.success) {
                state.lastMessage = message;
                state.messages = state.messages.concat(message);
                if (message.orders) state.orders = message.orders;
                if (message.total) state.total = message.total;
                if (message.totalToday) state.totalToday = message.totalToday;
            }
        },
    },
});

export const { setReadyState, receiveSocketMessage } = socketSlice.actions;
export default socketSlice.reducer;

export const wsOrderActions: TSocketActions = {
    wsStart: 'ORDER/WS_START',
    wsClose: 'ORDER/WS_CLOSE',
    wsSend: 'ORDER/WS_SEND',
    onMessage: receiveSocketMessage.type,
    onReadyState: setReadyState.type,
};
