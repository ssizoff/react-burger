import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearIngredient,
    setIngredient,
} from '../../services/reducers/ingredient-reducer';
import { PROP_TYPES } from '../../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import BurgerGroup from './burger-group';
import styles from './burger.module.css';
import { BURGER_BUN } from './../../utils/data';

export default function BurgerIngredients({ types }) {
    const dispatch = useDispatch();
    const activeItem = useSelector(state => state.ingredient);
    const cart = useSelector(state => state.cart);
    const {
        loading,
        error,
        data: ingredients,
    } = useSelector(state => state.ingredients);
    const groupRefs = useRef({});

    const [activeTab, setActiveTab] = useState(BURGER_BUN);

    function saveRef(group, ref) {
        groupRefs.current[group] = ref;
    }

    function onItemClick(item) {
        dispatch(setIngredient(item));
    }

    function clearActiveItem() {
        dispatch(clearIngredient());
    }

    function onTablClick(tabKey) {
        setActiveTab(tabKey);
        const group = groupRefs.current[tabKey];
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
                            key={type}
                            type={type}
                            title={title}
                            cart={cart}
                            items={ingredients.filter(i => i.type === type)}
                            onItemClick={onItemClick}
                            onRef={saveRef}
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
