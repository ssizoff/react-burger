import { setAuthError, setAuthToken, setUser } from '../reducers/user-reducer';
import { AppDispatch } from '../root-store';
import {
    apiAuthLogout, apiUserGet, apiUserLogin, apiUserPatch, apiUserRegister, IUser, TAuth
} from './../../utils/burger-api';

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
