import { useEffect, useState } from 'react';
import { BURGER_CART, BURGER_TYPES } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { apiRequestIngredients } from '../../utils/burger-api';
import { BurgerContext } from './../../utils/burger-context';

//const cartIds = Object.keys(BURGER_CART);

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState();

    useEffect(() => apiRequestIngredients(setIngredients, setError), []);

    return (
        <BurgerContext.Provider value={{ ingredients, cart: BURGER_CART }}>
            <AppHeader />

            {error && <p className={styles.error}>{error}</p>}

            <main className={styles.main}>
                <div className={styles.left_panel}>
                    <BurgerIngredients types={BURGER_TYPES} />
                </div>
                <div className={styles.right_panel}>
                    <BurgerConstructor />
                </div>
            </main>
        </BurgerContext.Provider>
    );
}

// {showModal && (
//     <Modal header="Hello" onClose={() => setShowModal(false)}>
//         World!
//     </Modal>
// )}

export default App;
