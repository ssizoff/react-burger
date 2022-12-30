import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const onPasswordChange = e => setPassword(e.target.value);
    const onCodeChange = e => setCode(e.target.value);

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <div>
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
                <div className={`mb-20 ${styles.panel}`}>
                    <Button htmlType="button" type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <p
                    className={`text text_type_main-default text_color_inactive ${styles.panel}`}
                >
                    <span>Вспомнили пароль?</span>
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}
