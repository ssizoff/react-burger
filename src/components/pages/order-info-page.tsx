import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../services/root-store';
import { WS_CLOSE, WS_START } from '../../services/socketMiddleware';
import OrderInfo from '../order-details/order-info';
import styles from './orders.module.css';

export default function OrderInfoPage() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
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
        <div className={`mt-20 ${styles.panel640}`}>
            <OrderInfo orderId={id} />
        </div>
    );
}
