import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';
import { useSelector } from 'react-redux';
import { NavLink, Switch, useLocation } from 'react-router-dom';
import { fetchLogout } from '../../../services/reducers/user-reducer';
import { useAppDispatch } from '../../../services/root-store';
import { TJWTResponse } from '../../../utils/burger-api';
import ProtectedRoute from '../../../utils/protected-route';
import { TLocation, TLocationState } from '../../app/app';
import appStyles from '../../app/app.module.css';
import styles from '../login.module.css';
import ModalOrder from './../../modal/modal-order';
import ProfileOrderInfoPage from './profile-order-info-page';
import ProfileOrdersPage from './profile-orders-page';
import ProfilePage from './profile-page';
import menuStyles from './profile.menu.module.css';

export default function ProfileMenuPage() {
    const auth = useSelector<
        { user: { auth?: TJWTResponse } },
        TJWTResponse | undefined
    >(state => state.user.auth);
    const location: TLocation = useLocation<TLocationState>();
    const background: Location | undefined = location.state?.background;
    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch(fetchLogout(auth!.refreshToken));
    };

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
                <Switch location={background ?? location}>
                    <ProtectedRoute path="/profile/orders/:id" exact>
                        <ProfileOrderInfoPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders">
                        <ProfileOrdersPage />
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
                {background && (
                    <ProtectedRoute path="/profile/orders/:id" exact>
                        <ModalOrder />
                    </ProtectedRoute>
                )}
            </div>
        </div>
    );
}
