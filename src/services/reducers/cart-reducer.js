
import { createSlice } from '@reduxjs/toolkit';
import { BURGER_CART } from '../../utils/data';
import CartUtil from '../cart-util';


export const initialState = BURGER_CART;

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const cart = new CartUtil(state);

            cart.addItem(action.payload.id, action.payload.is_bun, action.payload.toKey);
            return cart.Items;
        },
        removeCartItem: (state, action) => {
            const cart = new CartUtil(state);

            cart.removeByKey(action.payload);
            return cart.Items;
        },
        reorderCartItem: (state, action) => {
            const cart = new CartUtil(state);

            cart.reoderByKey(action.payload.fromKey, action.payload.toKey);
            return cart.Items;
        }
    },
})

export const { addCartItem, removeCartItem, reorderCartItem } = cartSlice.actions;
export default cartSlice.reducer;







