import { configureStore } from '@reduxjs/toolkit'
import ingredients from './reducers/ingredients-reducer';
import cart from './reducers/cart-reducer';

const store = configureStore({
    reducer: {
        ingredients,
        cart
    },
});

export default store;

