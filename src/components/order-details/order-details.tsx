import {
    CheckMarkIcon,
    CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IOrder } from './../../utils/burger-api';
import styles from './order.details.module.css';

export default function OrderDetails() {
    const { success, order } = useSelector<
        { order: { success: boolean; order?: IOrder } },
        { success: boolean; order?: IOrder }
    >(state => state.order);

    return (
        <>
            <p className="text text_type_digits-large mb-8">
                {order?.number ?? 'Не определен'}
            </p>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <span className={`mb-15 ${styles.check}`}>
                {success ? (
                    <CheckMarkIcon type="primary" />
                ) : (
                    <CloseIcon type="primary" />
                )}
            </span>
            <p className="text text_type_main-medium mb-2">
                {success ? 'Ваш заказ начали готовить' : 'Заказ не оформлен'}
            </p>
            {success && (
                <p className="text text_type_main-medium text_color_inactive mb-30">
                    Дождитесь готовности на орбитальной станции
                </p>
            )}
        </>
    );
}
