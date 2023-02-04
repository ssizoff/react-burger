import { setAuthToken } from '../services/reducers/user-reducer';
import store from '../services/root-store';

const API_URL = 'https://norma.nomoreparties.space/api';

type TSuccessCallback<T = object> = (data: T) => void;
type TErrorCallback = (message: any) => void;
type TRequestProps = RequestInit & { token?: string; bodyObj?: object };
type TResponseBase = { success: boolean; message?: string };

export type TJWTResponse = { accessToken: string; refreshToken: string };
export type TAuth = TJWTResponse;

type TIngredientType = 'bun' | 'sauce' | 'main';

export interface IUser {
    email: string;
    name: string;
}

export interface IIngredient {
    _id: string;
    name: string;
    type: TIngredientType;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;

    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
}

export interface IOrder {
    _id: string;
    number: number;
    ingredients: IIngredient[];
    name: string;
    owner: IUser;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TOrderShort = Omit<IOrder, 'ingredients'> & {
    ingredients: string[];
};

function sendRequest<T = object>(
    url: string,
    onSuccess: TSuccessCallback<T>,
    onError: TErrorCallback,
    props: TRequestProps = {}
) {
    const { bodyObj, method, token } = props;
    const headers: Record<string, string> = {};
    const params: RequestInit = { method: 'GET', headers };

    if (bodyObj) {
        params.body = JSON.stringify(bodyObj);
        params.method = method ?? 'POST';
        headers['Content-Type'] = 'application/json';
    }

    if (token)
        headers.Authorization = token.startsWith('Bearer')
            ? token
            : `Bearer ${token}`;

    fetch(`${API_URL}/${url}`, params)
        .then(res => {
            if (!res.ok) {
                const ct = res.headers.get('Content-Type');

                if (!ct?.startsWith('application/json'))
                    throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data: TResponseBase & T) => {
            if (data.success) onSuccess(data);
            else throw new Error(data.message);
        })
        .catch(err => onError(err.message ?? 'Ошибка запроса'));
}

function apiAuthRefresh(
    token: string,
    onSuccess: TSuccessCallback<TJWTResponse>,
    onError: TErrorCallback
) {
    sendRequest<TJWTResponse>('auth/token', onSuccess, onError, {
        bodyObj: { token },
    });
}

function sendAuthRequest<T = object>(
    url: string,
    onSuccess: TSuccessCallback<T>,
    onError: TErrorCallback,
    props: TRequestProps = {},
    iterationIndex = 1
) {
    const auth = store.getState().user.auth;

    const error: TErrorCallback = err => {
        if (err === 'jwt expired') {
            if (iterationIndex > 2) onError(err);
            else {
                apiAuthRefresh(
                    auth!.refreshToken,
                    ({ accessToken, refreshToken }) => {
                        store.dispatch(
                            setAuthToken({ accessToken, refreshToken })
                        );
                        sendAuthRequest<T>(
                            url,
                            onSuccess,
                            onError,
                            props,
                            iterationIndex + 1
                        );
                    },
                    onError
                );
            }
        } else onError(err);
    };

    sendRequest<T>(url, onSuccess, error, {
        ...props,
        token: auth!.accessToken,
    });
}

export function apiRequestIngredients(
    onSuccess: TSuccessCallback<IIngredient[]>,
    onError: TErrorCallback
) {
    sendRequest<{ data: IIngredient[] }>(
        'ingredients',
        ({ data }) => onSuccess(data),
        onError
    );
}

export function apiPasswordReset(
    email: string,
    onSuccess: TSuccessCallback,
    onError: TErrorCallback
) {
    sendRequest('password-reset', onSuccess, onError, { bodyObj: { email } });
}

export function apiPasswordResetSubmit(
    password: string,
    token: string,
    onSuccess: TSuccessCallback,
    onError: TErrorCallback
) {
    sendRequest('password-reset/reset', onSuccess, onError, {
        bodyObj: { password, token },
    });
}

export function apiUserRegister(
    name: string,
    email: string,
    password: string,
    onSuccess: TSuccessCallback<TAuth>,
    onError: TErrorCallback
) {
    sendRequest('auth/register', onSuccess, onError, {
        bodyObj: { name, email, password },
    });
}

export function apiUserLogin(
    email: string,
    password: string,
    onSuccess: TSuccessCallback<{ user: IUser } & TAuth>,
    onError: TErrorCallback
) {
    sendRequest('auth/login', onSuccess, onError, {
        bodyObj: { email, password },
    });
}

export function apiAuthLogout(
    token: string,
    onSuccess: TSuccessCallback,
    onError: TErrorCallback
) {
    sendRequest('auth/logout', onSuccess, onError, { bodyObj: { token } });
}

export function apiUserGet(
    onSuccess: TSuccessCallback<IUser>,
    onError: TErrorCallback
) {
    sendAuthRequest<{ user: IUser }>(
        'auth/user',
        ({ user }) => onSuccess(user),
        onError
    );
}

export function apiUserPatch(
    user: IUser,
    onSuccess: TSuccessCallback<IUser>,
    onError: TErrorCallback
) {
    sendAuthRequest<{ user: IUser }>(
        'auth/user',
        ({ user }) => onSuccess(user),
        onError,
        {
            bodyObj: user,
            method: 'PATCH',
        }
    );
}

export function apiSendOrder(
    ingredients: string[],
    onSuccess: TSuccessCallback<IOrder>,
    onError: TErrorCallback
) {
    sendAuthRequest<{ order: IOrder }>(
        'orders',
        ({ order }) => onSuccess(order),
        onError,
        { bodyObj: { ingredients } }
    );
}
