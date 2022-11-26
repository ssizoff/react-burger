import React from 'react';
import { Logo, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default class AppHeader extends React.Component {
    render() {
        return (
            <>
                <Logo />
                <ListIcon type="primary" />
            </>
        );
    }
}
