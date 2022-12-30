import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    fetchRegister,
    setAuthError,
} from './../../services/reducers/user-reducer';
import styles from './login.module.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.user.profile);
    const error = useSelector(state => state.user.error);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (user) history.push('/');
    }, [history, user]);

    const onRegisterClick = () =>
        dispatch(fetchRegister(name, email, password));
    const onNameChange = e => {
        setName(e.target.value);
        dispatch(setAuthError(null));
    };
    const onEmailChange = e => {
        setEmail(e.target.value);
        dispatch(setAuthError(null));
    };
    const onPasswordChange = e => {
        setPassword(e.target.value);
        dispatch(setAuthError(null));
    };

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <div>
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
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={onRegisterClick}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
                <p
                    className={`text text_type_main-default text_color_inactive ${styles.panel}`}
                >
                    <span>Уже зарегистрированы?</span>
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}
