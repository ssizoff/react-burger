import { IIngredient } from '../../utils/burger-api';
import styles from './ingredient.details.module.css';

export type TIngredientDetailsProps = {
    item: IIngredient;
};

export default function IngredientDetails({
    item,
}: TIngredientDetailsProps): JSX.Element {
    return (
        <>
            <img
                alt={item.name}
                src={item.image_large}
                className={styles.image}
            />
            <p className="text text_type_main-default mb-8">{item.name}</p>
            <div className={`text text_color_inactive ${styles.nutrition}`}>
                <div>
                    <p className="pb-2">Калории,ккал</p>
                    <p className="text_type_digits-default">{item.proteins}</p>
                </div>
                <div>
                    <p className="pb-2">Белки, г</p>
                    <p className="text_type_digits-default">{item.fat}</p>
                </div>
                <div>
                    <p className="pb-2">Жиры, г</p>
                    <p className="text_type_digits-default">
                        {item.carbohydrates}
                    </p>
                </div>
                <div>
                    <p className="pb-2">Углеводы, г</p>
                    <p className="text_type_digits-default">{item.calories}</p>
                </div>
            </div>
        </>
    );
}
