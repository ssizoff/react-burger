import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './burger.module.css';
import { PROP_TYPES } from './../../utils/types';

export default class BurgerItem extends React.Component {
    render() {
        const { item, count } = this.props;
        const { name, image, price } = item;

        return (
            <div className={styles.item}>
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
}

BurgerItem.propTypes = {
    count: PropTypes.number,
    item: PROP_TYPES.burgerIngredient.isRequired,
};
