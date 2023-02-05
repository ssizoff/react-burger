import { PayloadAction } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './root-store';

export type TSocketActions = {
    wsStart: string;
    wsClose: string;
    wsSend: string;
    onMessage: string;
    onReadyState: string;
};

export const socketMiddleware =
    (routing: TSocketActions): Middleware =>
    (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: PayloadAction<any>) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === routing.wsStart) {
                socket = new WebSocket(payload);

                socket.onopen = _ =>
                    dispatch({
                        type: routing.onReadyState,
                        payload: socket!.readyState,
                    });
                socket.onclose = _ => {
                    if (socket) {
                        dispatch({
                            type: routing.onReadyState,
                            payload: socket!.readyState,
                        });
                        socket = null;
                    }
                };
                socket.onmessage = event =>
                    dispatch({
                        type: routing.onMessage,
                        payload: JSON.parse(event.data),
                    });
            }

            if (type === routing.wsSend) socket?.send(JSON.stringify(payload));

            if (type === routing.wsClose) {
                socket?.close();
                socket = null;
            }

            next(action);
        };
    };
