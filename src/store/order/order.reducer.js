import * as types from './../types';

const initialState = {
    name: '',
    email: '',
    confirm: '',
    hotel: '',
    room: '',
    city: sessionStorage.city ? JSON.parse(sessionStorage.city) : '',
    firstDate: '',
    lastDate: '',
    peopleCount: 1,
    childCount: 0,
    cardholderCard: '',
    cardNumber: '',
    cvv2: '',
    expireDate: '',
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ORDER_DATA:
            return {
                ...state,
                [action.name]: action.value,
            }

        default:
            return state
    }
}

export default orderReducer