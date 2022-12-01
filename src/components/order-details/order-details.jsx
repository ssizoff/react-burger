import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './order.details.module.css';

export default function OrderDetails({ orderNumber }) {
    return (
        <>
            <p className="text text_type_digits-large mb-8">{orderNumber}</p>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <span className={`mb-15 ${styles.check}`}>
                <CheckMarkIcon type="primary" />
            </span>
            <p className="text text_type_main-medium mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-medium text_color_inactive mb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired,
};
