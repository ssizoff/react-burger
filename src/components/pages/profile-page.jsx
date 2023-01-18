import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearAuthError,
    fetchUser,
    fetchUserPatch,
} from '../../services/reducers/user-reducer';
import styles from './login.module.css';

export default function ProfilePage() {
    const user = useSelector(state => state.user.profile);
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState('');
    const [modified, setModified] = useState(false);
    const error = useSelector(state => state.user.error);

    const dispatch = useDispatch();

    const onNameChange = e => {
        setName(e.target.value);
        setModified(true);
    };
    const onEmailChange = e => {
        setEmail(e.target.value);
        setModified(true);
    };
    const onPasswordChange = e => {
        setPassword(e.target.value);
        setModified(true);
    };
    const onCancelClick = () => {
        setName(user?.name ?? '');
        setEmail(user?.email ?? '');
        setModified(false);
    };
    const onSaveClick = e => {
        dispatch(fetchUserPatch({ name, email, password }));
        e.preventDefault();
        return false;
    };

    useEffect(() => dispatch(fetchUser()), [dispatch]);
    useEffect(() => setModified(false), [user]);
    useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

    return (
        <form onSubmit={onSaveClick}>
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
                placeholder="Логин"
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
            {modified && (
                <div className={`input_size_default ${styles.panel}`}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={onCancelClick}
                    >
                        Отменить
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}
