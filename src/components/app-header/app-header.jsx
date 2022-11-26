import {
    BurgerIcon,
    Button,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './header.module.css';

export default class AppHeader extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <span className={styles.logo}>
                    <Logo />
                </span>
                <Button htmlType="button" type="secondary" size="large">
                    <BurgerIcon type="primary" />
                    <span>Конструктор</span>
                </Button>
                <Button htmlType="button" type="secondary" size="large">
                    <ListIcon type="secondary" />
                    <span className="text_color_inactive">Лента заказов</span>
                </Button>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    extraClass={`${styles.profile}`}
                >
                    <ProfileIcon type="secondary" />
                    <span className="text_color_inactive">Личный кабинет</span>
                </Button>
            </div>
        );
    }
}
