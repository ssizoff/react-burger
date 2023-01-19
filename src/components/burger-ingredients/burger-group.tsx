import CartUtil, { TCartItem } from '../../services/cart-util';
import { IIngredient } from '../../utils/burger-api';
import BurgerItem from './burger-item';
import styles from './burger.module.css';

export type TBurgerGroupProps = {
    type: string;
    title: string;
    items: IIngredient[];
    cart: TCartItem[];
    onItemClick: (item: IIngredient) => void;
    onRef: (type: string, ref: HTMLDivElement) => void;
};

export default function BurgerGroup({
    title,
    type,
    items,
    cart,
    onItemClick,
    onRef,
}: TBurgerGroupProps): JSX.Element {
    const util = new CartUtil(cart);

    return (
        <div
            id={`group-${type}`}
            style={{ boxSizing: 'border-box' }}
            ref={ref => {
                if (ref) onRef(type, ref);
            }}
        >
            <p className="mb-6 pl-1 pt-10 text text_type_main-medium">
                {title}
            </p>
            <div className={styles.group}>
                {items.map(i => (
                    <BurgerItem
                        key={i._id}
                        item={i}
                        count={util.count(i._id)}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    );
}
