import * as types from './../types';

const hasTours = localStorage.cartToursArray;

const initialState = {
    tours: null,
    singleTour: null,
    cartToursArray: hasTours ? JSON.parse(localStorage.cartToursArray) : [],
};

const toursReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOUR_DATA:
            return {
                ...state,
                singleTour: {
                    ...state.singleTour,
                    [action.name]: action.value,
                }
            };
        case types.SET_TOURS:
            return {
                ...state,
                tours: action.tours,
            };
        case types.GET_SINGLE_TOUR:
            return {
                ...state,
                singleTour: action.singleTour,
            };
        case types.MUTATE_TO_CART:
            return {
                ...state,
                cartToursArray: action.cartToursArray,
            };
        default:
            return state
    }
};

export default toursReducer;