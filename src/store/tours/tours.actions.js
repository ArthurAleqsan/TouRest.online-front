import * as types from './../types';
import { message } from 'antd';

import ToursService from '../../services/ToursService';
import { replaceCitisChars } from '../../util/helpers';
import { setSliderImages } from '../global/global.actions';


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