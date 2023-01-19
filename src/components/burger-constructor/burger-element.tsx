import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
    addCartItem,
    removeCartItem,
    reorderCartItem,
} from '../../services/reducers/cart-reducer';
import styles from './constructor.module.css';
import { useDrop } from 'react-dnd/dist/hooks';
import { IIngredient } from '../../utils/burger-api';

export type TBurgerElementProps = {
    itemKey: string;
    item: IIngredient;
};

export default function BurgerElement({
    itemKey,
    item,
}: TBurgerElementProps): JSX.Element {
    const dispatch = useDispatch();
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'ELEMENT',
            item: { key: itemKey },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        [itemKey]
    );
    const [{ isHover }, dropRef] = useDrop<any, any, { isHover: boolean }>(
        () => ({
            accept: 'ELEMENT', //['INGREDIENT', 'ELEMENT'],
            canDrop: ({ key, is_bun }) => !is_bun && key !== itemKey,
            collect: monitor => ({
                isHover: monitor.canDrop() && monitor.isOver(),
            }),
            drop: item =>
                dispatch(
                    item.key
                        ? reorderCartItem({ fromKey: item.key, toKey: itemKey })
                        : addCartItem({ ...item, toKey: itemKey })
                ),
        }),
        [itemKey]
    );

    return (
        <div ref={dropRef}>
            <div ref={dragRef} className={styles.item} style={{ opacity }}>
                <DragIcon type="primary" />
                <ConstructorElement
                    extraClass={isHover ? styles.item_hover : undefined}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => dispatch(removeCartItem(itemKey))}
                />
            </div>
        </div>
    );
}
