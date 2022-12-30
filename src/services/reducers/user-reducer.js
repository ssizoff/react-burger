
import { createSlice } from '@reduxjs/toolkit';
import { apiAuthLogout, apiUserLogin, apiUserPatch } from '../../utils/burger-api';
import { apiUserRegister, apiUserGet } from './../../utils/burger-api';

export const initialState = {
    profile: JSON.parse(localStorage.getItem("profile")),
    auth: JSON.parse(localStorage.getItem("auth")),
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.error = null;
            state.profile = action.payload;

            if (state.profile)
                localStorage.setItem(
                    'profile',
                    JSON.stringify(state.profile)
                );
            else {
                state.auth = null;
                localStorage.clear();
            }
        },
        setAuthToken: (state, action) => {
            state.error = null;
            state.auth = action.payload;
            localStorage.setItem(
                'auth',
                JSON.stringify(state.auth)
            );
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setUser, setAuthToken, setAuthError } = userSlice.actions;
export default userSlice.reducer;

export const fetchLogin =
    (email, password) =>
        (dispatch) =>
            apiUserLogin(email, password,
                ({ user, accessToken, refreshToken }) => {
                    dispatch(setUser(user));
                    dispatch(setAuthToken({ accessToken, refreshToken }));
                },
                error => dispatch(setAuthError(error)));

export const fetchLogout =
    (token) =>
        (dispatch) =>
            apiAuthLogout(token,
                () => dispatch(setUser(null)),
                error => dispatch(setAuthError(error)));

export const fetchRegister =
    (name, email, password) =>
        (dispatch) =>
            apiUserRegister(
                name,
                email,
                password,
                ({ accessToken, refreshToken }) => {
                    dispatch(setUser({ name, email }));
                    dispatch(setAuthToken({ accessToken, refreshToken }));
                },
                error => dispatch(setAuthError(error))
            );

export const fetchUser =
    () =>
        (dispatch) =>
            apiUserGet(({ user }) => dispatch(setUser(user)),
                error => dispatch(setAuthError(error))
            );

export const fetchUserPatch =
    (user) =>
        (dispatch) =>
            apiUserPatch(user,
                ({ user }) => dispatch(setUser(user)),
                error => dispatch(setAuthError(error))
            );



