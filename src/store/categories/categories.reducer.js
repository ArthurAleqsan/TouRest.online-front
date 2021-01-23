import * as types from '../types';

const initialState = {
    categories: [],
    imagesArray: [],
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
        case types.RESET_CATEGORIES:
            return {
                ...state,
                categories: [],
            }
        default:
            return state;
    }
};

export default categoriesReducer;