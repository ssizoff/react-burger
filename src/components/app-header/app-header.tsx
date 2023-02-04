import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../utils/burger-api';
import styles from './header.module.css';

export default function AppHeader() {
    const user: IUser = useSelector<{ user: { profile: IUser } }, IUser>(
        state => state.user.profile
    );

    return (
        <header>
            <nav className={styles.header}>
                <span className={styles.logo}>
                    <Logo />
                </span>
                <NavLink
                    to="/"
                    exact
                    className={styles.link}
                    activeClassName={styles.linkActive}
                >
                    <BurgerIcon type="secondary" />
                    <span className="text text_type_main-default">
                        Конструктор
                    </span>
                </NavLink>
                <NavLink
                    to="/feed"
                    className={styles.link}
                    activeClassName={styles.linkActive}
                >
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default">
                        Лента заказов
                    </span>
                </NavLink>
                <NavLink
                    to={user ? '/profile' : '/login'}
                    className={`${styles.link} ${styles.profile}`}
                    activeClassName={styles.linkActive}
                >
                    <ProfileIcon type="secondary" />
                    <span className="text text_type_main-default">
                        {user?.name ?? 'Личный кабинет'}
                    </span>
                </NavLink>
            </nav>
        </header>
    );
}
