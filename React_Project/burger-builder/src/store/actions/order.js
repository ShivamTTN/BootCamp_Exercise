import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData

    }
}

export const burgerPurchaseFail = (err) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        error: err
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }

}

export const burgerPurchase = (orderData) => {

    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post('/order.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(burgerPurchaseSuccess(res.data.name, orderData))
            })
            .catch(err => {
                dispatch(burgerPurchaseFail(err))
            })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/order.json')
            .then(res => {
                // console.log(res.data)
                const fetchOrders = []
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
                // this.setState({ loading: false, orders: fetchOrders })
                // 
            })
            .catch(err => {
                // this.setState({ loading: false })
                dispatch(fetchOrderFail(err))
            })
    }
}