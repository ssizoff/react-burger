import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

export default function ModalHeader({ children, onClose }) {
    return (
        <div className={styles.header}>
            <p className="text text_type_main-medium">{children}</p>
            <CloseIcon type="primary" onClick={onClose} />
        </div>
    );
}
