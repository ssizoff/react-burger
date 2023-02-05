import { useParams } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppSelector } from './../../services/root-store';
import styles from './login.module.css';

export default function IngredientPage() {
    const { id } = useParams<{ id: string }>();
    const ingredients = useAppSelector(state => state.ingredients.data);
    const item = ingredients.find(i => i._id === id);

    return (
        <div className={`mt-20 ${styles.panel} ${styles.header}`}>
            <div>
                <p className="text text_type_main-large">Детали ингредиента</p>
                {item ? (
                    <IngredientDetails item={item} />
                ) : (
                    <p className="text text_type_main-default text_color_error">
                        Не найдено
                    </p>
                )}
            </div>
        </div>
    );
}
