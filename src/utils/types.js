
import PropTypes from 'prop-types';
import { BURGER_BUN } from './data';

const TYPE_VARIANTS = [BURGER_BUN, 'sauce', 'main'];

export const PROP_TYPES = {

    burgerType: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(TYPE_VARIANTS).isRequired,
    }).isRequired,

    burgerIngredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(TYPE_VARIANTS).isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    }).isRequired,

    burgerCartItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        extra_id: PropTypes.number.isRequired,
        is_bun: PropTypes.bool.isRequired,
    }).isRequired,

    order: PropTypes.shape({
        success: PropTypes.bool.isRequired,
        name: PropTypes.string,
        order: PropTypes.shape({
            number: PropTypes.number.isRequired,
        }).isRequired,
    })
};