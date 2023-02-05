import { wsOrderActions } from '../reducers/socket-reducer';

export function socketStart(token?: string) {
    return {
        type: wsOrderActions.wsStart,
        payload: token
            ? `wss://norma.nomoreparties.space/orders?token=${token}`
            : 'wss://norma.nomoreparties.space/orders/all',
    };
}

export function socketStop() {
    return { type: wsOrderActions.wsClose };
}
