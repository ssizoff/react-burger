import { Location } from 'history';
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/root-store';
import ProtectedRoute from '../../utils/protected-route';
import AppHeader from '../app-header/app-header';
import {
    ForgotPasswordPage,
    IngredientPage,
    LoginPage,
    MainPage,
    OrderInfoPage,
    OrdersPage,
    Page404,
    RegisterPage,
    ResetPasswordPage,
} from '../pages';
import ProfileMenuPage from '../pages/profile/profile-menu-page';
import { fetchIngredients } from './../../services/actions/ingredient-actions';
import styles from './app.module.css';
import ModalIngredient from './../modal/modal-ingredient';
import ModalOrder from './../modal/modal-order';

export type TLocationState = { background?: Location };
export type TLocation = Location<TLocationState>;

function App() {
    const dispatch = useAppDispatch();
    const location: TLocation = useLocation<TLocationState>();
    const background: Location | undefined = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <Switch location={background ?? location}>
                    <Route path="/feed/:id" exact>
                        <OrderInfoPage />
                    </Route>
                    <Route path="/feed" exact>
                        <OrdersPage />
                    </Route>
                    <Route path="/ingredient/:id" exact>
                        <IngredientPage />
                    </Route>
                    <ProtectedRoute path="/login" needAuth={false}>
                        <LoginPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/register" needAuth={false}>
                        <RegisterPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/forgot-password" needAuth={false}>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/reset-password" needAuth={false}>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile">
                        <ProfileMenuPage />
                    </ProtectedRoute>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route>
                        <Page404 />
                    </Route>
                </Switch>

                {background && (
                    <Switch>
                        <Route path="/ingredient/:id" exact>
                            <ModalIngredient />
                        </Route>
                        <Route path="/feed/:id" exact>
                            <ModalOrder />
                        </Route>
                    </Switch>
                )}
            </main>
        </>
    );
}

export default App;
