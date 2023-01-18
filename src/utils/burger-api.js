
import { setAuthToken } from '../services/reducers/user-reducer';
import store from './../services/root-store';

const API_URL = 'https://norma.nomoreparties.space/api';

function sendRequest(url, onSuccess, onError, props = {}) {
    const { body, method, token } = props;
    const params = { method: "GET", headers: {} };

    if (body) {
        params.body = JSON.stringify(body);
        params.method = method ?? "POST";
        params.headers['Content-Type'] = 'application/json';
    }

    if (token) params.headers.Authorization = token.startsWith('Bearer') ? token : `Bearer ${token}`;

    fetch(`${API_URL}/${url}`, params)
        .then(res => {
            if (!res.ok) {
                const ct = res.headers.get('Content-Type');

                if (!ct?.startsWith('application/json'))
                    throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            if (!data.success) throw new Error(data.message);
            onSuccess(data);
        })
        .catch(err => onError(err.message ?? 'Ошибка запроса'));
}

function apiAuthRefresh(token, onSuccess, onError) {
    sendRequest('auth/token', onSuccess, onError, { body: { token } });
}

function sendAuthRequest(url, onSuccess, onError, props = {}, iterationIndex = 1) {
    const auth = store.getState().user.auth;

    const error = err => {
        if (err === 'jwt expired') {
            if (iterationIndex > 2) onError(err);
            else {
                apiAuthRefresh(auth.refreshToken,
                    ({ accessToken, refreshToken }) => {
                        store.dispatch(setAuthToken({ accessToken, refreshToken }));
                        sendAuthRequest(url, onSuccess, onError, props, iterationIndex + 1);
                    },
                    onError);
            }
        }
        else onError(err);
    };

    sendRequest(url, onSuccess, error, { ...props, token: auth.accessToken });
}

export function apiRequestIngredients(onSuccess, onError) {
    sendRequest('ingredients', ({ data }) => onSuccess(data), onError);
}


export function apiPasswordReset(email, onSuccess, onError) {
    sendRequest('password-reset', onSuccess, onError, { body: { email } });
}

export function apiPasswordResetSubmit(password, token, onSuccess, onError) {
    sendRequest('password-reset/reset', onSuccess, onError, { body: { password, token } });
}

export function apiUserRegister(name, email, password, onSuccess, onError) {
    sendRequest('auth/register', onSuccess, onError, { body: { name, email, password } });
}

export function apiUserLogin(email, password, onSuccess, onError) {
    sendRequest('auth/login', onSuccess, onError, { body: { email, password } });
}

export function apiAuthLogout(token, onSuccess, onError) {
    sendRequest('auth/logout', onSuccess, onError, { body: { token } });
}

export function apiUserGet(onSuccess, onError) {
    sendAuthRequest('auth/user', onSuccess, onError);
}

export function apiUserPatch(user, onSuccess, onError) {
    sendAuthRequest('auth/user', onSuccess, onError, { body: user, method: "PATCH" });
}

export function apiSendOrder(ingredients, onSuccess, onError) {
    sendAuthRequest('orders', onSuccess, onError, { body: { ingredients } });
}

