
import { createSlice } from '@reduxjs/toolkit';
import { apiRequestIngredients } from '../../utils/burger-api';


export const initialState = {
    loading: false,
    error: null,
    data: []
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        startLoading:
            (state) => {
                state.loading = true;
                state.error = null;
            },
        loadSuccess:
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
            },
        loadError:
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
    },
})

export const { loadSuccess, startLoading, loadError } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;


export const fetchIngredients = () => (dispatch) => {
    dispatch(startLoading());

    apiRequestIngredients(
        data => dispatch(loadSuccess(data)),
        error => dispatch(loadError(error))
    );
}





