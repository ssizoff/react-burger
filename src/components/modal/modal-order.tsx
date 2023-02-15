import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TLocationState } from '../app/app';
import OrderInfo from '../order-details/order-info';
import Modal from './modal';

export default function ModalOrder() {
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background = location.state.background!;
    const { id } = useParams<{ id: string }>();

    return (
        <Modal onClose={() => history.push(background.pathname)}
        >
            <OrderInfo orderId={id} />
        </Modal>
    );
}
