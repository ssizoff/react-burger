import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_DATA } from '../../utils/data';
import BurgerItem from './burger-item';

export default class BurgerConstructor extends React.Component {
    state = {
        activeTab: 'bun',
    };

    setActiveTab = activeTab => this.setState({ activeTab });

    render() {
        const { activeTab } = this.state;
        const types = [
            { title: 'Булки', type: 'bun' },
            { title: 'Соусы', type: 'sauce' },
            { title: 'Начинки', type: 'main' },
        ];

        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
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
                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {types.map(({ type, title }) => (
                        <div key={type}>
                            <p className="mt-10 mb-6 pl-1 text text_type_main-medium">
                                {title}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 24,
                                }}
                                className="pt-4 pl-4 pb-4"
                            >
                                {BURGER_DATA.filter(i => i.type === type).map(
                                    i => (
                                        <BurgerItem key={i.id} item={i} />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
