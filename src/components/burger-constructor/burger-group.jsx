import React from 'react';
import BurgerItem from './burger-item';
import styles from './burger.module.css';
import PropTypes from 'prop-types';
import { PROP_TYPES } from '../../utils/types';

export default class BurgerGroup extends React.Component {
    render() {
        const { title, items, cart } = this.props;

        return (
            <div className="pt-10">
                <p className="mb-6 pl-1 text text_type_main-medium">{title}</p>
                <div className={styles.group}>
                    {items.map(i => (
                        <BurgerItem key={i._id} item={i} count={cart[i._id]} />
                    ))}
                </div>
            </div>
        );
    }
}

BurgerGroup.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
    cart: PropTypes.object,
};
