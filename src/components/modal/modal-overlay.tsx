import styles from './modal.module.css';

export type TModalOverlayProps = {
    onClose: () => void;
};

export function ModalOverlay({ onClose }: TModalOverlayProps): JSX.Element {
    return <div className={styles.overlay} onClick={onClose} />;
}
