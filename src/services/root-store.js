import { configureStore } from '@reduxjs/toolkit';
import cart from './reducers/cart-reducer';
import ingredients from './reducers/ingredients-reducer';
import order from './reducers/order-reducer';
import user from './reducers/user-reducer';

const store = configureStore({
    reducer: {
        ingredients,
        cart,
        order,
        user
    },
    devTools: true
});

export default store;

