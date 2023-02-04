import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CartUtil, { TCartItem } from '../cart-util';

export const initialState: TCartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (
            state,
            action: PayloadAction<{
                id: string;
                is_bun: boolean;
                toKey?: string;
            }>
        ) => {
            const cart = new CartUtil(state);
            cart.addItem(
                action.payload.id,
                action.payload.is_bun,
                action.payload.toKey
            );
            return cart.toArray();
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            const cart = new CartUtil(state);
            cart.removeByKey(action.payload);
            return cart.toArray();
        },
        reorderCartItem: (
            state,
            action: PayloadAction<{ fromKey: string; toKey: string }>
        ) => {
            const cart = new CartUtil(state);
            cart.reoderByKey(action.payload.fromKey, action.payload.toKey);
            return cart.toArray();
        },
    },
});

export const { addCartItem, removeCartItem, reorderCartItem } =
    cartSlice.actions;
export default cartSlice.reducer;
