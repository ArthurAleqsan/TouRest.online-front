import CategoryService from '../../containers/services/CategoryService';
import { replaceCitisChars } from '../../util/helpers';
import * as types from './../types';

export const getCategories = (dispatch, c) => {

    CategoryService.getCategories()
        .then(res => {
            const { status, json: categories } = res;
            if (CategoryService.isOkStatus(status)) {
                // const filteredCategories = categories.filter(category => category.city == city);
                dispatch({
                    type: types.GET_CATEGORIES,
                    categories,
                });
            }
        });
}

export const resetCategories = (dispatch) => {
    dispatch({ type: types.RESET_CATEGORIES });
}