import CartUtil from '../../services/cart-util';
import cartReducer, { addCartItem, clearCart, initialState, removeCartItem, reorderCartItem } from './../../services/reducers/cart-reducer';

describe('Cart reducer', () => {
    const actionItem = { id: "Ingredient_A", is_bun: false };

    function buildCart(count) {
        const state = []

        for (let extra_id = 1; extra_id <= count; extra_id++) {
            const i = { ...actionItem, extra_id };
            state.push({ ...i, key: CartUtil.itemKey(i) });
        }
        return state;
    }

    it('Should return the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    it('Add cart item', () => {
        const state = buildCart(1);
        expect(cartReducer([], addCartItem(actionItem))).toEqual(state);
    });

    it('Add second cart item', () => {
        const state = buildCart(2);
        expect(cartReducer([state[0]], addCartItem(actionItem))).toEqual(state);
    });

    it('Add cart item to position', () => {
        const [i1, i2, i3] = buildCart(3);
        expect(cartReducer([i1, i2], addCartItem({ ...actionItem, toKey: i1.key }))).toEqual([i3, i1, i2]);
    });
    
    it('Reorder cart items', () => {
        const [i1, i2, i3] = buildCart(3);
        expect(cartReducer([i1, i2, i3], reorderCartItem({ fromKey: i3.key, toKey: i1.key }))).toEqual([i3, i1, i2]);
    });

    it('Remove cart item', () => {
        const state = buildCart(2);
        expect(cartReducer(state, removeCartItem(state[0].key))).toEqual([state[1]]);
    });

    it('Clear cart', () => {
        const state = buildCart(1);
        expect(cartReducer(state, clearCart())).toEqual([]);
    });

});