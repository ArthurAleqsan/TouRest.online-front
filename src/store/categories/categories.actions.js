import CategoryService from '../../services/CategoryService';
import { replaceCitisChars } from '../../util/helpers';
import * as types from './../types';
import {makePath} from "../../util/helpers";

const _getCity = (city) => {
    city = makePath(city);
    switch(city) {
        case 'sharm-el-sheikh':
            return 'Sharm El Sheikh';
        case 'aswan':
            return 'Aswan';
        default:
            return 'Hurgada';
    }
}

export const getCategories = (dispatch, c) => {
    const city = _getCity(c);
    CategoryService.getCategories()
        .then(res => {
            const { status, json: categories } = res;
            if (CategoryService.isOkStatus(status)) {
                const filteredCategories = categories.filter(category => category.city == city);
                dispatch({
                    type: types.GET_CATEGORIES,
                    categories: filteredCategories,
                });
            }
        });
}

export const resetCategories = (dispatch) => {
    dispatch({ type: types.RESET_CATEGORIES });
}