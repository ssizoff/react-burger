import { BURGER_TYPES } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './main.module.css';

export default function MainPage() {
    return (
        <>
            <div className={styles.left_panel}>
                <BurgerIngredients types={BURGER_TYPES} />
            </div>
            <div className={styles.right_panel}>
                <BurgerConstructor />
            </div>
        </>
    );
}
