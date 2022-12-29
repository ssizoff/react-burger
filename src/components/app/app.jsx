import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BURGER_TYPES } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { fetchIngredients } from './../../services/reducers/ingredients-reducer';
import styles from './app.module.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />

            <main className={styles.main}>
                <div className={styles.left_panel}>
                    <BurgerIngredients types={BURGER_TYPES} />
                </div>
                <div className={styles.right_panel}>
                    <BurgerConstructor />
                </div>
            </main>
        </>
    );
}

export default App;
