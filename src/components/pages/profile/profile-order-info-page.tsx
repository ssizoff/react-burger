import { useParams } from 'react-router-dom';
import { useAuthSocket } from '../../../services/hooks/useSocket';
import OrderInfo from '../../order-details/order-info';
import styles from './order.info.module.css';

export default function ProfileOrderInfoPage() {
    const { id } = useParams<{ id: string }>();

    useAuthSocket();

    return (
        <div className={`mt-20 ${styles.panel640}`}>
            <OrderInfo orderId={id} />
        </div>
    );
}
