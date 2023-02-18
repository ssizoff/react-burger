import socketReducer, { initialState, setReadyState, receiveSocketMessage } from '../../services/reducers/socket-reducer';

describe('Order reducer', () => {

    it('Should return the initial state', () => {
        expect(socketReducer(undefined, {}))
            .toEqual(initialState);
    });

    it('Ready state change', () => {
        expect(socketReducer(undefined, setReadyState(3)))
            .toEqual({ ...initialState, readyState: 3 });
    });

    it('Receive message total', () => {
        expect(socketReducer(undefined, receiveSocketMessage({ success: true, total: 100 })))
            .toEqual({ ...initialState, total: 100 });
    });

    it('Receive message total today', () => {
        expect(socketReducer(undefined, receiveSocketMessage({ success: true, totalToday: 100 })))
            .toEqual({ ...initialState, totalToday: 100 });
    });

    it('Receive message orders', () => {
        expect(socketReducer(undefined, receiveSocketMessage({ success: true, orders: [{ id: 1 }] })))
            .toEqual({ ...initialState, orders: [{ id: 1 }] });
    });

    it('Receive fail', () => {
        expect(socketReducer(undefined, receiveSocketMessage({ success: false })))
            .toEqual(initialState);
    });

});