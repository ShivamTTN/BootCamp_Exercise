import * as actiontypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false

}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId, })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const orderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.PURCHASE_INIT: return updateObject(state, { purchased: false })
        case actiontypes.BURGER_PURCHASE_START: return updateObject(state, { loading: true })
        case actiontypes.BURGER_PURCHASE_SUCCESS: return purchaseSuccess(state, action)
        case actiontypes.BURGER_PURCHASE_FAIL: return updateObject(state, { loading: false })
        case actiontypes.FETCH_ORDERS_START: return updateObject(state, { loading: true })
        case actiontypes.FETCH_ORDERS_SUCCESS: return orderSuccess(state, action)
        case actiontypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false })
        default: return state;
    }
}

export default reducer