import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../services/reducers/cart-reducer';
import { fetchOrder, hideOrder } from '../../services/reducers/order-reducer';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import CartUtil from './../../services/cart-util';
import BurgerElement from './burger-element';
import styles from './constructor.module.css';
import { useHistory, useLocation } from 'react-router-dom';

export default function BurgerConstructor() {
    const { data: ingredients } = useSelector(state => state.ingredients);
    const cart = useSelector(state => state.cart);
    const order = useSelector(state => state.order);
    const { auth } = useSelector(state => state.user);
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    const bun = useMemo(
        () => new CartUtil(cart).getBun(ingredients),
        [cart, ingredients]
    );
    const items = useMemo(
        () => new CartUtil(cart).getCart(ingredients),
        [cart, ingredients]
    );
    const totalPrice = useMemo(
        () => new CartUtil(cart).getTotalPrice(ingredients),
        [cart, ingredients]
    );

    const [, dropRef] = useDrop(
        () => ({
            accept: 'INGREDIENT',
            canDrop: item => item.is_bun || items.length === 0,
            drop: item => dispatch(addCartItem(item)),
        }),
        [items]
    );

    function onOrderClick() {
        if (!auth)
            history.push({
                pathname: '/login',
                state: { from: location.pathname },
            });
        else dispatch(fetchOrder(new CartUtil(cart).getIds()));
    }

    function closeOrder() {
        dispatch(hideOrder());
    }

    return (
        <>
            {order.show && (
                <Modal onClose={closeOrder}>
                    <OrderDetails />
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
                <div className={styles.middle_panel} ref={dropRef}>
                    {items.map(({ key, item }) => (
                        <BurgerElement key={key} itemKey={key} item={item} />
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
