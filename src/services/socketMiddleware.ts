import { PayloadAction } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { receiveSocketMessage, setReadyState } from './reducers/socket-reducer';
import { AppDispatch, RootState } from './root-store';

export const WS_START: 'WS_START' = 'WS_START';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';
export const WS_SEND: 'WS_SEND' = 'WS_SEND';

export const socketMiddleware: Middleware = (
    store: MiddlewareAPI<AppDispatch, RootState>
) => {
    let socket: WebSocket | null = null;

    return next => (action: PayloadAction<any>) => {
        const { dispatch } = store;
        const { type, payload } = action;

        if (type === WS_START) {
            socket = new WebSocket(payload);

            socket.onopen = _ => dispatch(setReadyState(socket!.readyState));
            socket.onclose = _ => {
                if (socket) {
                    dispatch(setReadyState(socket!.readyState));
                    socket = null;
                }
            };
            socket.onmessage = event =>
                dispatch(receiveSocketMessage(JSON.parse(event.data)));
        }

        if (type === WS_SEND) socket?.send(JSON.stringify(payload));

        if (type === WS_CLOSE) {
            socket?.close();
            socket = null;
        }

        next(action);
    };
};
