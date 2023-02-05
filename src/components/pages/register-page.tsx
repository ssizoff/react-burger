import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRegister } from '../../services/actions/user-actions';
import { clearAuthError } from '../../services/reducers/user-reducer';
import { useAppDispatch } from '../../services/root-store';
import { useAppSelector } from './../../services/root-store';
import styles from './login.module.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector(state => state.user.error);
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(clearAuthError());
        },
        [dispatch]
    );

    const onRegisterClick = (e: SyntheticEvent) => {
        dispatch(fetchRegister(name, email, password));
        e.preventDefault();
        return false;
    };
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        dispatch(clearAuthError());
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        dispatch(clearAuthError());
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        dispatch(clearAuthError());
    };

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <form onSubmit={onRegisterClick}>
                <p className={`text text_type_main-medium ${styles.header}`}>
                    Регистрация
                </p>
                <Input
                    type="text"
                    placeholder="Имя"
                    onChange={onNameChange}
                    value={name}
                    name="name"
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    name="email"
                    placeholder="Email"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    placeholder="Пароль"
                    name="password"
                    extraClass="mb-6"
                />
                {error && (
                    <p className="p-2 text text_type_main-default text_color_error">
                        {error}
                    </p>
                )}
                <div className={`mb-20 ${styles.panel}`}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
                <p
                    className={`text text_type_main-default text_color_inactive ${styles.panel}`}
                >
                    <span>Уже зарегистрированы?</span>
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    );
}
