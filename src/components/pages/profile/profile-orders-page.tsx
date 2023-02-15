import { useAuthSocket } from '../../../services/hooks/useSocket';
import OrdersList from './../../order-details/orders-list';

export default function ProfileOrdersPage() {

    useAuthSocket();

    return (
        <div>
            <p className="text text_type_main-medium pb-15">Заказы:</p>
            <OrdersList path="profile/orders" />
        </div>
    );
}
