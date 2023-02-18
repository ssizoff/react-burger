import userReducer, { clearAuthError, setAuthError, setAuthToken, setUser, userInitialState } from '../../services/reducers/user-reducer';

describe('User reducer', () => {

    let setItemSpy, getItemSpy, resetSpy;

    const testData = { test: true };
    const initStorage = { auth: testData, profile: testData };
    const mockStorage = {};

    beforeEach(() => {
        Object.assign(mockStorage, {
            auth: JSON.stringify(testData),
            profile: JSON.stringify(testData),
        });

        setItemSpy = jest
            .spyOn(global.Storage.prototype, "setItem")
            .mockImplementation((key, value) => {
                mockStorage[key] = value;
            });

        getItemSpy = jest
            .spyOn(global.Storage.prototype, "getItem")
            .mockImplementation((key) => mockStorage[key]);

        resetSpy = jest
            .spyOn(global.Storage.prototype, "clear")
            .mockImplementation(() =>
                Object.keys(mockStorage).forEach((key) => delete mockStorage[key])
            );
    });

    afterAll(() => {
        // then, detach our spies to avoid breaking other test suites
        getItemSpy.mockRestore();
        setItemSpy.mockRestore();
        resetSpy.mockRestore();
    });

    it('Should return the initial state', () => {
        expect(userReducer(undefined, {}))
            .toEqual(userInitialState());
    });

    it('User initial state', () => {
        const state = userInitialState();
        expect(state).toEqual(initStorage);
        expect(getItemSpy).toHaveBeenCalledTimes(2);
    });

    it('Set user', () => {
        const state = userInitialState();
        const user = { id: 1, name: "user" };
        expect(userReducer(state, setUser(user)))
            .toEqual({ ...state, profile: user });
        expect(setItemSpy).toHaveBeenCalledWith("profile", JSON.stringify(user));
    });

    it('Clear user', () => {
        const state = userInitialState();

        expect(userReducer(state, setUser()))
            .toEqual({ ...state, profile: undefined, auth: undefined });
        expect(resetSpy).toHaveBeenCalled();
    });

    it('Set token', () => {
        const state = userInitialState();
        const token = { token: "123" };
        expect(userReducer(state, setAuthToken(token)))
            .toEqual({ ...state, auth: token });
        expect(setItemSpy).toHaveBeenCalledWith("auth", JSON.stringify(token));
    });

    it('Set auth error', () => {
        const error = "error";
        expect(userReducer(undefined, setAuthError(error)))
            .toEqual({ ...userInitialState(), error });
    });

    it('Clear auth error', () => {
        const error = "error";
        expect(userReducer({ ...userInitialState(), error }, clearAuthError()))
            .toEqual(userInitialState());
    });
});