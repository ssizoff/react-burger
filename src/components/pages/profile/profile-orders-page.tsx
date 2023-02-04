import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../services/root-store';
import { TAuth } from '../../../utils/burger-api';
import { WS_CLOSE, WS_START } from './../../../services/socketMiddleware';
import OrdersList from './../../order-details/orders-list';

export default function ProfileOrdersPage() {
    const { accessToken } = useSelector<{ user: { auth: TAuth } }, TAuth>(
        state => state.user.auth
    );

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
        <div>
            <p className="text text_type_main-medium pb-15">Заказы:</p>
            <OrdersList path="profile/orders" />
        </div>
    );
}
