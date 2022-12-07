import styles from './modal.module.css';

export function ModalOverlay({ onClose }) {
    return <div className={styles.overlay} onClick={onClose} />;
}
