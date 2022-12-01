import { BURGER_CART, BURGER_DATA, BURGER_TYPES } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

function App() {
    const cartIds = Object.keys(BURGER_CART);

    return (
        <>
            <AppHeader />

            <main className={styles.main}>
                <div className={styles.left_panel}>
                    <BurgerConstructor
                        cart={BURGER_CART}
                        data={BURGER_DATA}
                        types={BURGER_TYPES}
                    />
                </div>
                <div className={styles.right_panel}>
                    <BurgerIngredients
                        data={BURGER_DATA.filter(i => cartIds.includes(i._id))}
                    />
                </div>
            </main>
        </>
    );
}

export default App;
