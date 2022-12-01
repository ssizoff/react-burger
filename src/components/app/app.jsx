import { useEffect, useState } from 'react';
import { BURGER_CART, BURGER_TYPES } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const cartIds = Object.keys(BURGER_CART);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(({ success, data }) => {
                if (success) setIngredients(data);
                else setError(new Error('Ошибка запроса'));
            })
            .catch(err => setError(err.message));
    }, []);

    return (
        <>
            <AppHeader />

            {error && <p className={styles.error}>{error}</p>}

            <main className={styles.main}>
                <div className={styles.left_panel}>
                    <BurgerConstructor
                        cart={BURGER_CART}
                        data={ingredients}
                        types={BURGER_TYPES}
                    />
                </div>
                <div className={styles.right_panel}>
                    <BurgerIngredients
                        data={ingredients.filter(i => cartIds.includes(i._id))}
                    />
                </div>
            </main>

            <div id="react-modals" />
        </>
    );
}

// {showModal && (
//     <Modal header="Hello" onClose={() => setShowModal(false)}>
//         World!
//     </Modal>
// )}

export default App;
