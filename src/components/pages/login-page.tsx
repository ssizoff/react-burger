import {
    Button,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    clearAuthError,
    fetchLogin
} from '../../services/reducers/user-reducer';
import { useAppDispatch } from '../../services/root-store';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector<{ user: { error?: string } }, string | undefined>(
        state => state.user.error
    );
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(clearAuthError());
        },
        [dispatch]
    );

    const onLoginClick = (e: SyntheticEvent) => {
        dispatch(fetchLogin(email, password));
        e.preventDefault();
        return false;
    };

    const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        dispatch(clearAuthError());
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        dispatch(clearAuthError());
    };

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <form onSubmit={onLoginClick}>
                <p className={`text text_type_main-medium ${styles.header}`}>
                    Вход
                </p>
                <EmailInput
                    onChange={onLoginChange}
                    value={email}
                    name="email"
                    placeholder="Логин"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    name="password"
                    placeholder="Пароль"
                    extraClass="mb-6"
                />
                {error && (
                    <p className="p-2 text text_type_main-default text_color_error">
                        {error}
                    </p>
                )}
                <div className={`mb-20 ${styles.panel}`}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Вход
                    </Button>
                </div>
                <p
                    className={`text text_type_main-default text_color_inactive mb-4 ${styles.panel}`}
                >
                    <span>Вы — новый пользователь?</span>
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p
                    className={`text text_type_main-default text_color_inactive ${styles.panel}`}
                >
                    <span>Забыли пароль?</span>
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </form>
        </div>
    );
}
