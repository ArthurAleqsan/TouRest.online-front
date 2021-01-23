import { combineReducers } from 'redux';

import globals from './global/global.reducer';
import categories from './categories/categories.reducer';
import orders from './order/order.reducer';
import tours from './tours/tours.reducer';


export default combineReducers({
    globals,
    categories,
    orders,
    tours,
});