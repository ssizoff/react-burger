import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    apiAuthLogout,
    apiUserLogin,
    apiUserPatch,
    apiUserRegister,
    apiUserGet,
    IUser,
    TAuth,
} from '../../utils/burger-api';
import { AppDispatch } from '../root-store';

type TUserState = {
    auth?: TAuth;
    profile?: IUser;
    error?: string;
};

function fromLS<T>(name: string): T | undefined {
    const val = localStorage.getItem(name);
    if (val) return JSON.parse(val) as T;
}

export const initialState: TUserState = {
    auth: fromLS<TAuth>('auth'),
    profile: fromLS<IUser>('profile'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | undefined>) => {
            state.error = undefined;
            state.profile = action.payload;

            if (state.profile)
                localStorage.setItem('profile', JSON.stringify(state.profile));
            else {
                state.auth = undefined;
                localStorage.clear();
            }
        },
        setAuthToken: (state, action: PayloadAction<TAuth | undefined>) => {
            state.error = undefined;
            state.auth = action.payload;
            localStorage.setItem('auth', JSON.stringify(state.auth));
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearAuthError: state => {
            state.error = undefined;
        },
    },
});

export const { setUser, setAuthToken, setAuthError, clearAuthError } =
    userSlice.actions;
export default userSlice.reducer;

export const fetchLogin =
    (email: string, password: string) => (dispatch: AppDispatch) =>
        apiUserLogin(
            email,
            password,
            ({ user, accessToken, refreshToken }) => {
                dispatch(setUser(user));
                dispatch(setAuthToken({ accessToken, refreshToken }));
            },
            error => dispatch(setAuthError(error))
        );

export const fetchLogout = (token: string) => (dispatch: AppDispatch) =>
    apiAuthLogout(
        token,
        () => dispatch(setUser()),
        error => dispatch(setAuthError(error))
    );

export const fetchRegister =
    (name: string, email: string, password: string) =>
    (dispatch: AppDispatch) =>
        apiUserRegister(
            name,
            email,
            password,
            (auth: TAuth) => {
                dispatch(setUser({ name, email }));
                dispatch(setAuthToken(auth));
            },
            error => dispatch(setAuthError(error))
        );

export const fetchUser = () => (dispatch: AppDispatch) =>
    apiUserGet(
        user => dispatch(setUser(user)),
        error => dispatch(setAuthError(error))
    );

export const fetchUserPatch =
    (user: IUser & { password: string }) => (dispatch: AppDispatch) =>
        apiUserPatch(
            user,
            user => dispatch(setUser(user)),
            error => dispatch(setAuthError(error))
        );
