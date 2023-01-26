import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { IIngredient } from '../../utils/burger-api';
import { BURGER_BUN } from '../../utils/data';
import styles from './burger.module.css';

export type TBurgerItemProps = {
    item: IIngredient;
    count: number;
    onItemClick: (item: IIngredient) => void;
};

export default function BurgerItem({
    item,
    count,
    onItemClick,
}: TBurgerItemProps): JSX.Element {
    const { _id, name, image, price, type } = item;
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'INGREDIENT',
            item: { id: _id, is_bun: type === BURGER_BUN },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        [item]
    );

    return (
        <div
            className={styles.item}
            onClick={() => onItemClick(item)}
            ref={dragRef}
            style={{ opacity }}
        >
            {count > 0 && (
                <Counter
                    count={count}
                    size="default"
                    extraClass={styles.counter}
                />
            )}
            <img alt={name} src={image} />
            <div className={styles.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.title}`}>
                {name}
            </p>
        </div>
    );
}

