import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../services/root-store';
import { WS_CLOSE, WS_START } from '../../../services/socketMiddleware';
import { TAuth } from '../../../utils/burger-api';
import OrderInfo from '../../order-details/order-info';
import styles from './order.info.module.css';

export default function ProfileOrderInfoPage() {
    const { accessToken } = useSelector<{ user: { auth: TAuth } }, TAuth>(
        state => state.user.auth
    );
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = accessToken.replace('Bearer ', '');
        dispatch({
            type: WS_START,
            payload: `wss://norma.nomoreparties.space/orders?token=${token}`,
        });

        return () => {
            dispatch({ type: WS_CLOSE });
        };
    }, [dispatch, accessToken]);

    return (
        <div className={`mt-20 ${styles.panel640}`}>
            <OrderInfo orderId={id} />
        </div>
    );
}
