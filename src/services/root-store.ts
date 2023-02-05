import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import cart from './reducers/cart-reducer';
import ingredients from './reducers/ingredients-reducer';
import order from './reducers/order-reducer';
import socket, { wsOrderActions } from './reducers/socket-reducer';
import user from './reducers/user-reducer';
import { socketMiddleware } from './socketMiddleware';

const store = configureStore({
    reducer: {
        ingredients,
        cart,
        order,
        user,
        socket,
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(socketMiddleware(wsOrderActions)),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
    useSelector;
