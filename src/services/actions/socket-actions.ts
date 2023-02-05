import { WS_CLOSE, WS_START } from './../socketMiddleware';

export function socketStart(token?: string) {
    return {
        type: WS_START,
        payload: token
            ? `wss://norma.nomoreparties.space/orders?token=${token}`
            : 'wss://norma.nomoreparties.space/orders/all',
    };
}

export function socketStop() {
    return { type: WS_CLOSE };
}
