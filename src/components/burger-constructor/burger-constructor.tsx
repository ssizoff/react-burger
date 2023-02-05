import {
    Button,
    ConstructorElement,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import CartUtil, { TCartItem } from '../../services/cart-util';
import { addCartItem } from '../../services/reducers/cart-reducer';
import { hideOrder } from '../../services/reducers/order-reducer';
import { useAppDispatch } from '../../services/root-store';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { fetchOrder } from './../../services/actions/order-actions';
import { useAppSelector } from './../../services/root-store';
import BurgerElement from './burger-element';
import styles from './constructor.module.css';

export default function BurgerConstructor() {
    const ingredients = useAppSelector(state => state.ingredients.data);
    const cart: TCartItem[] = useAppSelector(state => state.cart);
    const order = useAppSelector(state => state.order);
    const auth = useAppSelector(state => state.user.auth);
    const history = useHistory();
    const location = useLocation();

    const dispatch = useAppDispatch();

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
            //canDrop: item => item.is_bun || items.length === 0,
            drop: (item: TCartItem) => dispatch(addCartItem(item)),
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
