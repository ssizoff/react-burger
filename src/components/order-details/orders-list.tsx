import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { IIngredient } from '../../utils/burger-api';
import IngredientIcon from '../burger-ingredients/ingredient-icon';
import { useAppSelector } from './../../services/root-store';
import { OrderStatus } from './order-info';
import styles from './orders.list.module.css';

export default function OrdersList({ path = 'feed' }: { path?: string }) {
    const location = useLocation();
    const history = useHistory();
    const { orders } = useAppSelector(state => state.socket);
    const ingredientsAll: IIngredient[] = useAppSelector(
        state => state.ingredients.data
    );

    function calcCount(items: string[]): Record<string, number> {
        const result = items.reduce<any>(
            (p, c) => ({ ...p, [c]: (p[c] ?? 0) + 1 }),
            {}
        );
        return result;
    }

    function calcPrice(ids: string[]): number {
        return ids.reduce(
            (p, c) => p + (ingredientsAll.find(i => i._id === c)?.price ?? 0),
            0
        );
    }

    return (
        <div className={styles.panel}>
            {orders!.map(
                ({ _id, name, number, ingredients, createdAt, status }) => (
                    <div
                        key={_id}
                        className={styles.box}
                        onClick={() =>
                            history.push({
                                pathname: `/${path}/${_id}`,
                                state: { background: location },
                            })
                        }
                    >
                        <div className={`${styles.head} mb-6`}>
                            <p className="text text_type_digits-default">{`#${number}`}</p>
                            <FormattedDate
                                date={new Date(createdAt)}
                                className="text text_type_main-small text_color_inactive"
                            />
                        </div>
                        <p className="text text_type_main-medium mb-2">
                            {name}
                        </p>
                        <OrderStatus status={status} className="mb-6" />
                        <div className={styles.head}>
                            <p className="ml-5">
                                {Object.entries(calcCount(ingredients)).map(
                                    ([id, count]) => (
                                        <IngredientIcon
                                            key={id}
                                            ingredientId={id}
                                            count={count}
                                            className={styles.m_minus20}
                                        />
                                    )
                                )}
                            </p>
                            <p className={styles.price}>
                                <span className="text text_type_digits-default">
                                    {calcPrice(ingredients)}
                                </span>
                                <CurrencyIcon type="primary" />
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
