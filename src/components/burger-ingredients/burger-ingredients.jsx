import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';
import { PROP_TYPES } from '../../utils/types';
import styles from './ingredients.module.css';

export default function BurgerIngredients({ data }) {
    const bun = data.find(i => i.type === 'bun');
    const items = data.filter(i => i.type !== 'bun');
    const totalPrice = data
        .map(i => i.price)
        .reduce((total, price) => total + price, 0);

    return (
        <div className={styles.panel}>
            <div className={styles.top_panel}>
                {bun && (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                )}
            </div>
            <div className={styles.middle_panel}>
                {items.map(item => (
                    <div key={item._id} className={styles.item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.bottom_panel}>
                {bun && (
                    <div className="pr-2 pl-8">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                )}
                <div className={styles.total_price}>
                    <span className="text text_type_digits-medium mr-2">
                        {totalPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        extraClass="ml-10"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PROP_TYPES.burgerIngredient).isRequired,
};
