import * as types from './../types';
import { message } from 'antd';

import { removeFromArray, replaceCitisChars } from '../../util/helpers';
import { setSliderImages } from '../global/global.actions';
import ToursService from '../../services/ToursService';



export const getTours = (dispatch, c) => {
    const city = replaceCitisChars(c);
    ToursService.getTours({ city })
        .then(res => {
            const { status, json: tours } = res;
            if (ToursService.isOkStatus(status)) {
                dispatch({
                    type: types.SET_TOURS,
                    tours,
                });
            } else {
                message.error(tours.message);
            }
        })
}
export const getTourById = (dispatch, id) => {
    ToursService.getTourById(id)
        .then(res => {
            const { status, json: singleTour } = res;
            if (ToursService.isOkStatus(status)) {
                dispatch(setSliderImages(singleTour.images));
                dispatch({
                    type: types.GET_SINGLE_TOUR,
                    singleTour,
                });
            } else {
                message.error(singleTour.message);
            }
        });
}
export const resetTours = (dispatch) => {
    dispatch({
        type: types.SET_TOURS,
        tours: [],
    });
}
export const resetSingleTour = (dispatch) => {
    dispatch({
        type: types.GET_SINGLE_TOUR,
        singleTour: null,
    });
}
export const removeFromCart = (dispatch, getState, id) => {
    const { cartToursArray } = getState().tours;
    const newCartToursArray = removeFromArray(cartToursArray, tour => tour.id === id);
    dispatch({
        type: types.MUTATE_TO_CART,
        cartToursArray: newCartToursArray,
    });
    const localStorageToursArr = JSON.parse(localStorage.getItem('cartToursArray'));
    for (let i = 0; i < localStorageToursArr.length; i++) {
        localStorageToursArr.splice(i, 1);
        localStorage.removeItem('cartToursArray');
        localStorage.setItem('cartToursArray', JSON.stringify(localStorageToursArr));
    }
}
