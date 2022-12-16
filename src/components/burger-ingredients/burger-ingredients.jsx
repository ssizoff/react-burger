import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearIngredient,
    setIngredient
} from '../../services/reducers/ingredient-reducer';
import { PROP_TYPES } from '../../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import BurgerGroup from './burger-group';
import styles from './burger.module.css';

export default function BurgerIngredients({ types }) {
    const dispatch = useDispatch();
    const activeItem = useSelector(state => state.ingredient);
    const cart = useSelector(state => state.cart);
    const {
        loading,
        error,
        data: ingredients,
    } = useSelector(state => state.ingredients);

    const [activeTab, setActiveTab] = useState('bun');

    function onItemClick(item) {
        dispatch(setIngredient(item));
    }

    function clearActiveItem() {
        dispatch(clearIngredient());
    }

    function onTablClick(tabKey) {
        setActiveTab(tabKey);
        const group = document.getElementById(`group-${tabKey}`);
        group?.scrollIntoView({ behavior: 'smooth' });
    }

    function onScroll(e) {
        for (const div of e.target.children)
            if (e.target.scrollTop >= div.offsetTop - e.target.offsetTop)
                setActiveTab(div.id.split('-')[1]);
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
                        onClick={onTablClick}
                    >
                        {i.title}
                    </Tab>
                ))}
            </div>
            <div className={styles.panel_list} onScroll={onScroll}>
                {loading && (
                    <div className={styles.info}>
                        <i>Загрузка...</i>
                    </div>
                )}
                {error && (
                    <div className={styles.info}>
                        <i>{error}</i>
                    </div>
                )}
                {!loading &&
                    !error &&
                    types.map(({ type, title }) => (
                        <BurgerGroup
                            id={`group-${type}`}
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
