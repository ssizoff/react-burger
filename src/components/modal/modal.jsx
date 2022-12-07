import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './modal-header';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.css';

export default function Modal({ children, header, onClose }) {
    const onKeyPress = useCallback(
        e => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress);
        return () => document.removeEventListener('keydown', onKeyPress);
    }, [onKeyPress]);

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
