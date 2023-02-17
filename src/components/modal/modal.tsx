import { useEffect, useCallback, ReactNode, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './modal-header';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.css';

export type TModalProps = {
    header?: ReactNode;
    onClose: () => void;
};

export default function Modal({
    children,
    header,
    onClose,
}: PropsWithChildren<TModalProps>) {
    const onKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress);
        return () => document.removeEventListener('keydown', onKeyPress);
    }, [onKeyPress]);

    const container = document.getElementById('react-modals');

    return (
        container &&
        ReactDOM.createPortal(
            <>
                <div data-testid="modal-window" className={styles.modal}>
                    <ModalHeader onClose={onClose}>{header}</ModalHeader>
                    <div className={styles.body}>{children}</div>
                </div>
                <ModalOverlay onClose={onClose} />
            </>,
            container
        )
    );
}
