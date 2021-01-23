import * as types from './../types';

export const setLng = (dispatch, lng) => {
    sessionStorage.setItem('lng', JSON.stringify(lng));
    dispatch({
        type: types.SET_LNG,
        lng,
    });
};

export const resetImagesArr = (dispatch) => {
    dispatch({
        type: types.RESET_IMAGES,
    })
};
export const setLocation = (dispatch, location) => {
    dispatch({
        type: types.SET_LOCATION,
        location,
    })
};