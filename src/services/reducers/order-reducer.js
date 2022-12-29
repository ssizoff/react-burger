
import { createSlice } from '@reduxjs/toolkit';
import { apiSendOrder } from '../../utils/burger-api';


export const initialState = {
    show: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            return { ...action.payload, show: true };
        },
        hideOrder: (state) => {
            state.show = false;
        },
    },
})

export const { setOrder, hideOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const fetchOrder = (ids) => (dispatch) => apiSendOrder(ids, data => dispatch(setOrder(data)));






