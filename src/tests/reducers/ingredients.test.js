import ingredientsReducer, { initialState, loadError, loadSuccess, startLoading } from './../../services/reducers/ingredients-reducer';

describe('Ingredients reducer', () => {

    const testIngredient = {
        _id: "ABC",
        name: "Bun",
        type: "bun",
        price: 100,
        image: "image.png",
        image_large: "image_lg.png",
        image_mobile: "image_mob.png",
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
    }

    it('Should return the initial state', () => {
        expect(ingredientsReducer(undefined, {}))
            .toEqual(initialState);
    });

    it('Start loading', () => {
        expect(ingredientsReducer(undefined, startLoading()))
            .toEqual({ ...initialState, loading: true });
    });

    it('Load success', () => {
        expect(ingredientsReducer(undefined, loadSuccess([testIngredient])))
            .toEqual({ ...initialState, data: [testIngredient] });
    });

    it('Load error', () => {
        expect(ingredientsReducer(undefined, loadError("Error")))
            .toEqual({ ...initialState, error: "Error" });
    });

});