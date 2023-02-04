import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './reducers/cart-reducer';
import ingredients from './reducers/ingredients-reducer';
import order from './reducers/order-reducer';
import user from './reducers/user-reducer';
import socket from './reducers/socket-reducer';
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
        getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
