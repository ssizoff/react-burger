import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../utils/burger-api';

export type TOrderState = {
    show: boolean;
    success: boolean;
    order?: IOrder;
};

export const initialState: TOrderState = {
    show: false,
    success: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<Omit<TOrderState, 'show'>>) => {
            state.order = action.payload.order;
            state.success = action.payload.success;
            state.show = true;
        },
        hideOrder: state => {
            state.show = false;
        },
    },
});

export const { setOrder, hideOrder } = orderSlice.actions;
export default orderSlice.reducer;
