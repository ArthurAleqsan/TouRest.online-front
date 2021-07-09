import * as types from './../types';
// import TransactionService from '../../services/TransactionService';
// import EmailService from '../../services/EmailService';
import CartService from '../../services/CartService';
import ToursService from "../../services/ToursService";
import {batch} from "react-redux";
import {setSliderImages} from "../global/global.actions";
import {message} from "antd";

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
    dispatch({
        type: types.SET_ORDER_DATA,
        name: 'peopleCount',
        value: 0,
    });
}

export const checkout = (dispatch, getState, tickets) => {
    const {name, firstDate, lastDate, email, hotel, room } = getState().orders.orderState;
    const _name = name.split(" ");
    const data = {
        startDate: firstDate,
        endDate: lastDate,
        hotel: hotel,
        room: room
    };
    data['tickets'] = tickets;
    data['user'] = {
        email:email,
        firstName:_name[0],
        lastName:_name[1],
    }
   
    CartService.addOrder(data).then(res => {
        const { status, json: order } = res;
        if (CartService.isOkStatus(status)) {
                dispatch({
                    type: types.GET_ORDER_DATA,
                    isLoading: true
                });
        } else {
            message.error(order.message);
        }
    });
}