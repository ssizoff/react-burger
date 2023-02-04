import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from './../../utils/burger-api';

export type TIngredientState = {
    loading: boolean;
    error?: string;
    data: IIngredient[];
};

export const initialState: TIngredientState = {
    loading: false,
    data: [],
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        startLoading: state => {
            state.loading = true;
            state.error = undefined;
        },
        loadSuccess: (state, action: PayloadAction<IIngredient[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        loadError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { loadSuccess, startLoading, loadError } =
    ingredientsSlice.actions;

export default ingredientsSlice.reducer;

