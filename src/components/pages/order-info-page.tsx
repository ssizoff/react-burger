import { useParams } from 'react-router-dom';
import OrderInfo from '../order-details/order-info';
import { useSocket } from './../../services/hooks/useSocket';
import styles from './orders.module.css';

export default function OrderInfoPage() {
    const { id } = useParams<{ id: string }>();

    useSocket();

    return (
        <div className={`mt-20 ${styles.panel640}`}>
            <OrderInfo orderId={id} />
        </div>
    );
}
