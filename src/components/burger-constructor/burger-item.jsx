import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger.module.css';

export default class BurgerItem extends React.Component {
    render() {
        const { name, image, price } = this.props.item;

        return (
            <div className={styles.item}>
                <img alt={name} src={image} />
                <div className={styles.price}>
                    <CurrencyIcon type="primary" />
                    <p className="text text_type_digits-default">{price}</p>
                </div>
                <p className={`text text_type_main-default ${styles.title}`}>
                    {name}
                </p>
            </div>
        );
    }
}
