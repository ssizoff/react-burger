import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { BurgerContext } from '../../utils/burger-context';
import { PROP_TYPES } from '../../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import BurgerGroup from './burger-group';
import styles from './burger.module.css';

export default function BurgerIngredients({ types }) {
    const [activeTab, setActiveTab] = useState('bun');
    const [activeItem, setActiveItem] = useState();
    const { ingredients, cart } = useContext(BurgerContext);

    function onItemClick(item) {
        setActiveItem(item);
    }

    function clearActiveItem() {
        setActiveItem(undefined);
    }

    return (
        <div className={styles.panel}>
            <p className="mt-10 mb-5 pl-1 text text_type_main-large">
                Соберите бургер
            </p>
            <div className={styles.panel_tab}>
                {types.map(i => (
                    <Tab
                        key={i.type}
                        value={i.type}
                        active={activeTab === i.type}
                        onClick={setActiveTab}
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
                        items={ingredients.filter(i => i.type === type)}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>

            {activeItem && (
                <Modal header="Детали ингредиента" onClose={clearActiveItem}>
                    <IngredientDetails item={activeItem} />
                </Modal>
            )}
        </div>
    );
}

BurgerIngredients.propTypes = {
    types: PropTypes.arrayOf(PROP_TYPES.burgerType).isRequired,
};
