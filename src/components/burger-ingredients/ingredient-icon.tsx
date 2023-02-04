import { useSelector } from 'react-redux';
import { IIngredient } from '../../utils/burger-api';
import styles from './icon.module.css';

export type TIngredientIconProps = {
    ingredientId: string;
    count?: number;
    className?: string;
};

export default function IngredientIcon({
    ingredientId,
    count = 1,
    className,
}: TIngredientIconProps): JSX.Element | null {
    const ingredients: IIngredient[] = useSelector<
        { ingredients: { data: IIngredient[] } },
        IIngredient[]
    >(state => state.ingredients.data);

    const ingredient = ingredients.find(i => i._id === ingredientId);

    if (ingredient)
        return (
            <span
                className={`${styles.icon}${className ? ' ' + className : ''} `}
            >
                <img alt={ingredient.name} src={ingredient.image_mobile} />
                {count > 1 && (
                    <span className="text text_type_main-default">{`+${count}`}</span>
                )}
            </span>
        );

    return null;
}
