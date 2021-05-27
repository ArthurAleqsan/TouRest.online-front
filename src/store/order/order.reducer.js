import * as types from './../types';

const initialState = {
    orderState: {
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
    },
    isLoading: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ORDER_DATA:
            return {
                ...state,
                orderState: {
                    ...state.orderState,
                    [action.name]: action.value,
                }
            }
        case types.GET_ORDER_DATA:
            return {
                ...state,
                isLoading:action.isLoading
            }

        default:
            return state
    }
}

export default orderReducer