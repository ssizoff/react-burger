import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { BURGER_CART, BURGER_DATA, BURGER_TYPES } from './utils/data';

function App() {
    const cartIds = Object.keys(BURGER_CART);

    return (
        <>
            <header>
                <AppHeader />
            </header>
            
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
