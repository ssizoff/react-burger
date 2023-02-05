import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
    fetchUser,
    fetchUserPatch
} from '../../../services/actions/user-actions';
import { clearAuthError } from '../../../services/reducers/user-reducer';
import { useAppDispatch } from '../../../services/root-store';
import styles from '../login.module.css';
import { useAppSelector } from './../../../services/root-store';

export default function ProfilePage() {
    const user = useAppSelector(state => state.user.profile);
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState('');
    const [modified, setModified] = useState(false);
    const error = useAppSelector(state => state.user.error);

    const dispatch = useAppDispatch();

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setModified(true);
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setModified(true);
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setModified(true);
    };
    const onCancelClick = () => {
        setName(user?.name ?? '');
        setEmail(user?.email ?? '');
        setModified(false);
    };
    const onSaveClick = (e: SyntheticEvent) => {
        dispatch(fetchUserPatch({ name, email, password }));
        e.preventDefault();
        return false;
    };

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    useEffect(() => setModified(false), [user]);
    useEffect(
        () => () => {
            dispatch(clearAuthError());
        },
        [dispatch]
    );

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
