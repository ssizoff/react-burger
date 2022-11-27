import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import { PROP_TYPES } from '../../utils/types';
import BurgerGroup from './burger-group';
import styles from './burger.module.css';

export default class BurgerConstructor extends React.Component {
    state = {
        activeTab: 'bun',
    };

    setActiveTab = activeTab => this.setState({ activeTab });

    render() {
        const { activeTab } = this.state;
        const { data, types, cart } = this.props;

        return (
            <div className={styles.panel}>
                <p className="mt-10 mb-5 pl-1 text text_type_main-large">
                    Соберите бургер
                </p>
                <div style={{ display: 'flex' }}>
                    {types.map(i => (
                        <Tab
                            key={i.type}
                            value={i.type}
                            active={activeTab === i.type}
                            onClick={this.setActiveTab}
                        >
                            {i.title}
                        </Tab>
                    ))}
                </div>
                <div className={styles.panel_list}>
                    {types.map(({ type, title }) => (
                        <BurgerGroup
                            key={type}
                            title={title}
                            cart={cart}
                            items={data.filter(i => i.type === type)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

BurgerConstructor.propTypes = {
    types: PropTypes.arrayOf(PROP_TYPES.burgerType).isRequired,
    data: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
    cart: PropTypes.object,
};
