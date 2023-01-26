import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
    ForgotPasswordPage,
    IngredientPage,
    LoginPage,
    MainPage,
    OrdersPage,
    Page404,
    RegisterPage,
    ResetPasswordPage,
} from '../pages';
import { fetchIngredients } from '../../services/reducers/ingredients-reducer';
import ModalIngredient from '../modal/modal-ingredient';
import ProfileMenuPage from '../pages/profile-menu-page';
import styles from './app.module.css';
import ProtectedRoute from '../../utils/protected-route';
import { Location } from 'history';

export type TLocationState = { background?: Location<TLocationState> };
export type TLocation = Location<TLocationState>;

function App() {
    const dispatch = useDispatch();
    const location: TLocation = useLocation<TLocationState>();
    const background: TLocation | undefined = location.state?.background;

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <Switch location={background || location}>
                    <Route path="/orders">
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
                    <Route path="/ingredient/:id" exact>
                        <ModalIngredient />
                    </Route>
                )}
            </main>
        </>
    );
}

export default App;
