import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IIngredient } from '../../utils/burger-api';
import { TLocationState } from '../app/app';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from './modal';

export default function ModalIngredient() {
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const ingredients: IIngredient[] = useSelector<
        { ingredients: { data: IIngredient[] } },
        IIngredient[]
    >(state => state.ingredients.data);
    const item = ingredients.find(i => i._id === id);
    const background = location.state.background!;

    return (
        <Modal
            header="Детали ингредиента"
            onClose={() => history.push(background.pathname)}
        >
            {item ? (
                <IngredientDetails item={item} />
            ) : (
                <p className="text text_type_main-default text_color_error">
                    Не найдено
                </p>
            )}
        </Modal>
    );
}
