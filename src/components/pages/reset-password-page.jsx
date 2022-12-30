import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { apiPasswordResetSubmit } from '../../utils/burger-api';
import styles from './login.module.css';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState();
    const history = useHistory();
    const location = useLocation();

    if (!location.state?.codeSended) return <Redirect to="/forgot-password" />;

    const onPasswordChange = e => setPassword(e.target.value);
    const onCodeChange = e => setCode(e.target.value);
    const onResetClick = e => {
        apiPasswordResetSubmit(
            password,
            code,
            () => history.push('/login'),
            setError
        );
        e.preventDefault();
        return false;
    };

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <form onSubmit={onResetClick}>
                <p className={`text text_type_main-medium ${styles.header}`}>
                    Восстановление пароля
                </p>
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    name="password"
                    placeholder="Введите новый пароль"
                    extraClass="mb-6"
                />
                <Input
                    onChange={onCodeChange}
                    value={code}
                    name="code"
                    placeholder="Введите код из письма"
                    extraClass="mb-6"
                />
                {error && (
                    <p className="p-2 text text_type_main-default text_color_error">
                        {error}
                    </p>
                )}
                <div className={`mb-20 ${styles.panel}`}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <p
                    className={`text text_type_main-default text_color_inactive ${styles.panel}`}
                >
                    <span>Вспомнили пароль?</span>
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    );
}
