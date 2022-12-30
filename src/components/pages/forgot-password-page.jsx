import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { apiPasswordReset } from './../../utils/burger-api';
import styles from './login.module.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const history = useHistory();

    const onEmailChange = e => setEmail(e.target.value);
    const onResetClick = () => {
        apiPasswordReset(
            email,
            () => history.push('/reset-password'),
            setError
        );
    };

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <div>
                <p className={`text text_type_main-medium ${styles.header}`}>
                    Восстановление пароля
                </p>
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    name="email"
                    placeholder="Укажите e-mail"
                    isIcon={false}
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
                        onClick={onResetClick}
                    >
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
