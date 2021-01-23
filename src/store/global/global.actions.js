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
export const getCountryCode = (dispatch) => {
    fetch('https://extreme-ip-lookup.com/json/')
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: types.SET_COUNTRY,
                country: response.country,
            })
        })
};
export const setSliderImages = (imagesArr) => {
    return {
        type: types.SET_SLIDER_IMAGES,
        imagesArr,
    };
};