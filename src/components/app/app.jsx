import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
    ForgotPasswordPage,
    LoginPage,
    MainPage,
    Page404,
    RegisterPage,
    ResetPasswordPage,
    OrdersPage,
} from '../pages';
import { fetchIngredients } from './../../services/reducers/ingredients-reducer';
import ProfileMenuPage from './../pages/profile-menu-page';
import styles from './app.module.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <Router>
            <AppHeader />
            <main className={styles.main}>
                <Switch>
                    <Route path="/orders">
                        <OrdersPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>
                    <Route path="/reset-password">
                        <ResetPasswordPage />
                    </Route>
                    <Route path="/profile">
                        <ProfileMenuPage />
                    </Route>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route>
                        <Page404 />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
