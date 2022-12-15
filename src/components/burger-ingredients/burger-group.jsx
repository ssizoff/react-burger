import PropTypes from 'prop-types';
import { PROP_TYPES } from '../../utils/types';
import cartUtil from './../../services/cart-util';
import BurgerItem from './burger-item';
import styles from './burger.module.css';

export default function BurgerGroup({ id, title, items, cart, onItemClick }) {
    const util = new cartUtil(cart);

    return (
        <div id={id} className="pt-10">
            <p className="mb-6 pl-1 text text_type_main-medium">{title}</p>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
    cart: PropTypes.arrayOf(PROP_TYPES.burgerCartItem).isRequired,
    onItemClick: PropTypes.func.isRequired,
};
