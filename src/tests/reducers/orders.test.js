import orderReducer, { hideOrder, initialState, setOrder } from './../../services/reducers/order-reducer';

describe('Order reducer', () => {

    const testOrder = {
        _id: "123",
        number: 123,
        ingredients: [],
        name: "Test",
        owner: {},
        price: 100,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    it('Should return the initial state', () => {
        expect(orderReducer(undefined, {}))
            .toEqual(initialState);
    });

    it('Set success order', () => {
        expect(orderReducer(undefined, setOrder({ success: true, order: testOrder })))
            .toEqual({ success: true, order: testOrder, show: true });
    });

    it('Hide order', () => {
        expect(orderReducer(undefined, hideOrder()))
            .toEqual({ ...initialState, show: false });
    });

});