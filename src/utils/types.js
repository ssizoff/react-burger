
import PropTypes from 'prop-types';

const TYPE_VARIANTS = ['bun', 'sauce', 'main'];

export const PROP_TYPES = {

    burgerType: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(TYPE_VARIANTS).isRequired,
    }),

    burgerIngredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(TYPE_VARIANTS).isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    })
};