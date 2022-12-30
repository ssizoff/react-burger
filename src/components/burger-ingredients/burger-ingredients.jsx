import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { PROP_TYPES } from '../../utils/types';
import { BURGER_BUN } from './../../utils/data';
import BurgerGroup from './burger-group';
import styles from './burger.module.css';

export default function BurgerIngredients({ types }) {
    const cart = useSelector(state => state.cart);
    const history = useHistory();
    const location = useLocation();
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
        //dispatch(setIngredient(item));
        history.push({
            pathname: `/ingredient/${item._id}`,
            state: { background: location },
        });
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
        </div>
    );
}

BurgerIngredients.propTypes = {
    types: PropTypes.arrayOf(PROP_TYPES.burgerType).isRequired,
};
