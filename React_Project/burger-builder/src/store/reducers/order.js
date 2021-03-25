import * as actiontypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased :false

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.BURGER_PURCHASE_START:
            return{
                ...state,
                loading:true
            }
        case actiontypes.BURGER_PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId,
                
            }
            return {
                ...state,
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            }
        case actiontypes.BURGER_PURCHASE_FAIL:
            return {
                ...state,
                loading:false,

            }
        case actiontypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        case actiontypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading:true,
            }
        case actiontypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.orders,
                loading:false
            }
        case actiontypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer