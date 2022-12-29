import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { PROP_TYPES } from '../../utils/types';
import { BURGER_BUN } from './../../utils/data';
import styles from './burger.module.css';

export default function BurgerItem({ item, count, onItemClick }) {
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

BurgerItem.propTypes = {
    count: PropTypes.number,
    item: PROP_TYPES.burgerIngredient,
    onItemClick: PropTypes.func.isRequired,
};
