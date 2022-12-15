import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeCartItem, reorderCartItem } from '../../services/reducers/cart-reducer';
import styles from './constructor.module.css';
import { useDrop } from 'react-dnd/dist/hooks';


export default function BurgerElement({ itemKey, item }) {
    const dispatch = useDispatch();
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'ELEMENT',
            item: { key: itemKey },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        [item]
    );
    const [{ isHover }, dropRef] = useDrop(() => ({
        accept: 'ELEMENT',
        canDrop: ({ key }) => key !== itemKey,
        collect: monitor => ({
            isHover: monitor.canDrop() && monitor.isOver(),
        }),
        drop: item => dispatch(reorderCartItem({ fromKey: item.key, toKey: itemKey })),
    }));

    return (
        <div ref={dropRef}
            className={styles.item}
            style={{ opacity }}>
            <span ref={dragRef}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                extraClass={isHover ? styles.item_hover : undefined}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() =>
                    dispatch(removeCartItem(itemKey))
                }
            />
        </div>);
}