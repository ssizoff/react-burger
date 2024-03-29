import { clearCart } from '../reducers/cart-reducer';
import { setOrder } from '../reducers/order-reducer';
import { AppDispatch } from '../root-store';
import { apiSendOrder } from './../../utils/burger-api';

export const fetchOrder = (ids: string[]) => (dispatch: AppDispatch) =>
    apiSendOrder(
        ids,
        order => {
            dispatch(setOrder({ success: true, order }));
            dispatch(clearCart());
        },
        () => dispatch(setOrder({ success: false }))
    );
