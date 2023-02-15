import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IUser,
    TAuth
} from '../../utils/burger-api';

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


