import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-store';
import { IIngredient, TOrderShort } from '../../utils/burger-api';
import IngredientIcon from '../burger-ingredients/ingredient-icon';
import styles from './order.info.module.css';

export type TOrderInfo = {
    orderId: string;
};

const ORDER_STATUS: any = {
    created: 'Создан',
    done: 'Выполнен',
    pending: 'Готовится',
    cancel: 'Oтменен',
};

export function OrderStatus({
    status,
    className,
}: {
    status: string;
    className?: string;
}) {
    return (
        <p
            className={`text text_type_main-default${
                className ? ' ' + className : ''
            } `}
        >
            {ORDER_STATUS[status] ?? status}
        </p>
    );
}

export default function OrderInfo({ orderId }: TOrderInfo) {
    const ingredients: IIngredient[] = useSelector<
        { ingredients: { data: IIngredient[] } },
        IIngredient[]
    >(state => state.ingredients.data);
    const orders = useSelector<RootState, TOrderShort[] | undefined>(
        state => state.socket.orders
    );
    const order = orders?.find(i => i._id === orderId);

    if (!order) return <p className="text text_type_main-medium">Не найдено</p>;

    const items = ingredients.filter(i => order.ingredients.includes(i._id));
    const count = order.ingredients.reduce<any>(
        (p, c) => ({ ...p, [c]: (p[c] ?? 0) + 1 }),
        {}
    );
    const total = items.reduce((p, c) => p + c.price * count[c._id], 0);

    return (
        <>
            <p className="text text_type_digits-default mb-10">{`#${order.number}`}</p>

            <div className={styles.container}>
                <p className="text text_type_main-medium mb-3">{order.name}</p>
                <OrderStatus status={order.status} className="mb-15 text_color_success" />
                <p className="text text_type_main-medium mb-6">Состав:</p>

                <div className={styles.panel}>
                    {items.map(i => (
                        <div key={i._id} className={styles.item}>
                            <IngredientIcon ingredientId={i._id} />
                            <div className={styles.name}>
                                <p className="text text_type_main-default">
                                    {i.name}
                                </p>
                            </div>
                            <div className={styles.price}>
                                <span className="text text_type_digits-default">{`${
                                    count[i._id]
                                } x ${i.price}`}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.item}>
                    <div className={styles.name}>
                        <FormattedDate
                            className="text text_type_main-small text_color_inactive"
                            date={new Date(order.createdAt)}
                        />
                    </div>
                    <p className={styles.price}>
                        <span className="text text_type_digits-default">
                            {total}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </div>
        </>
    );
}
