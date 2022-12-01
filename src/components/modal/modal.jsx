import { ModalOverlay } from './modal-overlay';
import ModalHeader from './modal-header';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';

export default function Modal({ children, header, onClose }) {
    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <ModalHeader onClose={onClose}>{header}</ModalHeader>
                <div className={styles.body}>{children}</div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        document.getElementById('react-modals')
    );
}
