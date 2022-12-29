
const API_URL = 'https://norma.nomoreparties.space/api';

function sendRequest(url, body, onSuccess, onError) {
    const params = {};

    if (body) {
        Object.assign(params,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });
    }

    fetch(url, params)
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => {
            if (!data.success) throw new Error('Ошибка запроса');
            onSuccess(data);
        })
        .catch(err => onError(err.message));
}

export function apiRequestIngredients(onSuccess, onError) {
    sendRequest(`${API_URL}/ingredients`, undefined, ({ data }) => onSuccess(data), onError);
}

export function apiSendOrder(ingredients, onSuccess, onError) {
    sendRequest(`${API_URL}/orders`, { ingredients }, onSuccess, onError);
}