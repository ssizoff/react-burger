import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useState } from 'react';
import { apiSendOrder } from '../../utils/burger-api';
import { BurgerContext } from '../../utils/burger-context';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './constructor.module.css';

export default function BurgerConstructor() {
    const [order, setOrder] = useState();
    const { ingredients, cart } = useContext(BurgerContext);

    const data = ingredients.filter(i => cart[i._id] > 0);
    const bun = data.find(i => i.type === 'bun');
    const items = data.filter(i => i.type !== 'bun');
    const totalPrice =
        (bun?.price ?? 0) * 2 +
        items.map(i => i.price).reduce((total, price) => total + price, 0);

    function onOrderClick() {
        apiSendOrder([...Object.keys(cart)], setOrder, error => alert(error));
    }

    function clearOrder() {
        setOrder(undefined);
    }

    return (
        <>
            {order && (
                <Modal onClose={clearOrder}>
                    <OrderDetails order={order} />
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

