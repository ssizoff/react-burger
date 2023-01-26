import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PropsWithChildren } from 'react';
import styles from './modal.module.css';

export type TModalHeaderProps = {
    onClose: () => void;
};

export default function ModalHeader({
    children,
    onClose,
}: PropsWithChildren<TModalHeaderProps>): JSX.Element {
    return (
        <div className={styles.header}>
            <p className="text text_type_main-medium">{children}</p>
            <CloseIcon type="primary" onClick={onClose} />
        </div>
    );
}
