import {
    loadError,
    loadSuccess,
    startLoading,
} from '../reducers/ingredients-reducer';
import { AppDispatch } from '../root-store';
import { apiRequestIngredients } from './../../utils/burger-api';

export const fetchIngredients = () => (dispatch: AppDispatch) => {
    dispatch(startLoading());

    apiRequestIngredients(
        data => dispatch(loadSuccess(data)),
        error => dispatch(loadError(error))
    );
};
