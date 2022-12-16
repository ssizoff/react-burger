import PropTypes from 'prop-types';
import { PROP_TYPES } from '../../utils/types';
import CartUtil from './../../services/cart-util';
import BurgerItem from './burger-item';
import styles from './burger.module.css';

export default function BurgerGroup({
    title,
    type,
    items,
    cart,
    onItemClick,
    onRef,
}) {
    const util = new CartUtil(cart);

    return (
        <div
            id={`group-${type}`}
            style={{ boxSizing: 'border-box' }}
            ref={ref => onRef(type, ref)}
        >
            <p className="mb-6 pl-1 pt-10 text text_type_main-medium">
                {title}
            </p>
            <div className={styles.group}>
                {items.map(i => (
                    <BurgerItem
                        key={i._id}
                        item={i}
                        count={util.count(i._id)}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    );
}

BurgerGroup.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
    cart: PropTypes.arrayOf(PROP_TYPES.burgerCartItem).isRequired,
    onItemClick: PropTypes.func.isRequired,
    onRef: PropTypes.func.isRequired,
};
