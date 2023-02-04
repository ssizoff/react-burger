import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TSocketState } from '../../services/reducers/socket-reducer';
import { RootState, useAppDispatch } from '../../services/root-store';
import { WS_CLOSE, WS_START } from './../../services/socketMiddleware';
import OrdersList from './../order-details/orders-list';
import stylesMain from './main.module.css';
import styles from './orders.module.css';

export default function OrdersPage() {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useSelector<RootState, TSocketState>(
        state => state.socket
    );

    useEffect(() => {
        dispatch({
            type: WS_START,
            payload: 'wss://norma.nomoreparties.space/orders/all',
        });

        return () => {
            dispatch({ type: WS_CLOSE });
        };
    }, [dispatch]);

    return (
        <>
            <div className={stylesMain.left_panel}>
                <div className={styles.panel}>
                    <p className="mt-10 mb-5 pl-1 text text_type_main-large">
                        Лента заказов
                    </p>
                    <OrdersList />
                </div>
            </div>
            <div className={stylesMain.right_panel}>
                <div className="mt-15" />
                <div className={styles.columns}>
                    <div>
                        <p className="mt-10 mb-6 pl-1 text text_type_main-medium">
                            Готовы:
                        </p>
                        {orders!
                            .filter(
                                (order, idx) =>
                                    idx < 10 && order.status === 'done'
                            )
                            .map(({ number }) => (
                                <p
                                    key={number}
                                    className="text text_type_digits-default text_color_success mb-2"
                                >
                                    {number.toString().padStart(6, '0')}
                                </p>
                            ))}
                    </div>

                    <div>
                        <p className="mt-10 mb-6 pl-1 text text_type_main-medium">
                            В работе:
                        </p>
                        {orders!
                            .filter(
                                (order, idx) =>
                                    idx < 10 && order.status === 'pending'
                            )
                            .map(({ number }) => (
                                <p
                                    key={number}
                                    className="text text_type_digits-default mb-2"
                                >
                                    {number.toString().padStart(6, '0')}
                                </p>
                            ))}
                    </div>
                </div>
                <p className="mt-15 text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">{total}</p>
                <p className="mt-15 text text_type_main-medium">
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </>
    );
}
