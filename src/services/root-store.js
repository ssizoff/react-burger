import { configureStore } from '@reduxjs/toolkit'
import ingredient from './reducers/ingredient-reducer';
import ingredients from './reducers/ingredients-reducer';
import cart from './reducers/cart-reducer';
import order from './reducers/order-reducer';

const store = configureStore({
    reducer: {
        ingredient,
        ingredients,
        cart,
        order
    },
    devTools: true
});

export default store;

