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
            <div className={`p-4 ${styles.header}`}>
                <Button htmlType="button" type="secondary" size="large">
                    <BurgerIcon type="primary" />
                    <span className="ml-2">Конструктор</span>
                </Button>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    extraClass={styles.innactive}
                >
                    <ListIcon type="secondary" />
                    <span className="ml-2">Лента заказов</span>
                </Button>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    extraClass={styles.innactive}
                >
                    <ProfileIcon type="secondary" />
                    <span className="ml-2">Личный кабинет</span>
                </Button>
            </div>
        );
    }
}
