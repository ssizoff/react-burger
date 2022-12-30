import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch } from 'react-router-dom';
import { fetchLogout } from './../../services/reducers/user-reducer';
import ProtectedRoute from './../../utils/protected-route';
import appStyles from './../app/app.module.css';
import styles from './login.module.css';
import ProfilePage from './profile-page';
import menuStyles from './profile.menu.module.css';

export default function ProfileMenuPage() {
    const auth = useSelector(state => state.user.auth);
    const dispatch = useDispatch();

    const onLogout = () => dispatch(fetchLogout(auth.refreshToken));

    return (
        <div className={`${appStyles.main} ${menuStyles.menu_grid} mt-20`}>
            <nav>
                <NavLink
                    to="/profile"
                    exact
                    className={`${styles.link} text text_type_main-medium`}
                    activeClassName={styles.linkActive}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/profile/orders"
                    className={`${styles.link} text text_type_main-medium`}
                    activeClassName={styles.linkActive}
                >
                    Заказы
                </NavLink>
                <NavLink
                    to="/profile/logout"
                    className={`${styles.link} text text_type_main-medium`}
                    activeClassName={styles.linkActive}
                >
                    Выход
                </NavLink>
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <div className="ml-15">
                <Switch>
                    <ProtectedRoute path="/profile/orders/:id" exact>
                        <h1>Заказ</h1>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact>
                        <h1>История заказов</h1>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/logout" exact>
                        <Button
                            htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={onLogout}
                        >
                            Выйти
                        </Button>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile" exact>
                        <ProfilePage />
                    </ProtectedRoute>
                </Switch>
            </div>
        </div>
    );
}
