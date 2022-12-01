import { useState } from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';
import { PROP_TYPES } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './ingredients.module.css';

export default function BurgerIngredients({ data }) {
    const [order, setOrder] = useState();

    const bun = data.find(i => i.type === 'bun');
    const items = data.filter(i => i.type !== 'bun');
    const totalPrice = data
        .map(i => i.price)
        .reduce((total, price) => total + price, 0);

    function onOrderClick() {
        setOrder(123456);
    }

    function clearOrder() {
        setOrder(undefined);
    }

    return (
        <>
            {order && (
                <Modal onClose={clearOrder}>
                    <OrderDetails orderNumber={order} />
                </Modal>
            )}
            <div className={styles.panel}>
                <div className={styles.top_panel}>
                    {bun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                </div>
                <div className={styles.middle_panel}>
                    {items.map(item => (
                        <div key={item._id} className={styles.item}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.bottom_panel}>
                    {bun && (
                        <div className="pr-2 pl-8">
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}
                    <div className={styles.total_price}>
                        <span className="text text_type_digits-medium mr-2">
                            {totalPrice}
                        </span>
                        <CurrencyIcon type="primary" />
                        <Button
                            htmlType="button"
                            type="primary"
                            size="large"
                            extraClass="ml-10"
                            onClick={onOrderClick}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
};
