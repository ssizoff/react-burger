
import { createSlice } from '@reduxjs/toolkit';

export const initialState = null;

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setIngredient: (state, action) => {
            return action.payload;
        },
        clearIngredient: (state) => {
            return null;
        },
    },
})

export const { setIngredient, clearIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;







