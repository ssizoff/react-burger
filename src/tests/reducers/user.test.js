import userReducer, { userInitialState, setUser, setAuthToken, setAuthError, clearAuthError } from '../../services/reducers/user-reducer';

describe('User reducer', () => {

    it('Should return the initial state', () => {
        expect(userReducer(undefined, {}))
            .toEqual(userInitialState());
    });

    it('User initial state', () => {
        Object.defineProperty(window,
            "localStorage",
            {
                value: {
                    getItem: jest.fn(key => `{"key":"${key}"}`),
                    setItem: jest.fn(),
                    removeItem: jest.fn(),
                },
            });
        const state = userInitialState();
        expect(state).toEqual({ auth: { key: "auth" }, profile: { key: "profile" } });
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
    });

    it('Set user', () => {
        Object.defineProperty(window,
            "localStorage",
            {
                value: {
                    getItem: jest.fn(key => `{"key":"${key}"}`),
                    setItem: jest.fn((key, value) => { }),
                    removeItem: jest.fn(),
                    clear: jest.fn(),
                },
            });

        const state = userInitialState();
        const user = { id: 1, name: "user" };
        expect(userReducer(state, setUser(user)))
            .toEqual({ ...state, profile: user });
        expect(window.localStorage.setItem).toHaveBeenCalledWith("profile", JSON.stringify(user));
    });

    it('Clear user', () => {
        Object.defineProperty(window,
            "localStorage",
            {
                value: {
                    getItem: jest.fn(key => `{"key":"${key}"}`),
                    setItem: jest.fn((key, value) => { }),
                    removeItem: jest.fn(),
                    clear: jest.fn(),
                },
            });

        const state = userInitialState();
       
        expect(userReducer(state, setUser()))
            .toEqual({ ...state, profile: undefined, auth: undefined });
        expect(window.localStorage.clear).toHaveBeenCalled();
    });

    it('Set token', () => {
        Object.defineProperty(window,
            "localStorage",
            {
                value: {
                    getItem: jest.fn(key => `{"key":"${key}"}`),
                    setItem: jest.fn((key, value) => { }),
                    removeItem: jest.fn(),
                    clear: jest.fn(),
                },
            });

        const state = userInitialState();
        const token = { token: "123" };
        expect(userReducer(state, setAuthToken(token)))
            .toEqual({ ...state, auth: token });
        expect(window.localStorage.setItem).toHaveBeenCalledWith("auth", JSON.stringify(token));
    });

    it('Set auth error', () => {
        const error = "error";
        expect(userReducer(undefined, setAuthError(error)))
            .toEqual({ ...userInitialState(), error });
    });

    it('Clear auth error', () => {
        const error = "error";
        expect(userReducer({ error }, clearAuthError()))
            .toEqual({ ...userInitialState(), error: undefined });
    });
});