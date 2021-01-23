import * as types from './../types';
// import TransactionService from '../../services/TransactionService';
// import EmailService from '../../services/EmailService';

export const setOrderData = (dispatch, name, value) => {
    dispatch({
        type: types.SET_ORDER_DATA,
        name,
        value,
    });
}
export const resetOrderData = (dispatch) => {
    dispatch({
        type: types.SET_ORDER_DATA,
        name: 'firstDate',
        value: '',
    });
    dispatch({
        type: types.SET_ORDER_DATA,
        name: 'peopleCount',
        value: 1,
    });
    dispatch({
        type: types.SET_ORDER_DATA,
        name: 'childCount',
        value: 0,
    });
}

// export const checkout = (data) => {
//     return () => TransactionService.checkout(data)
//         .then(r => {
//             console.log(r);
//             EmailService.sendEmail(data).then(a => console.log(a))
//         });
// }