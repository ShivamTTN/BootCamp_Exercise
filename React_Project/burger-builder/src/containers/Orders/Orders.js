import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    componentDidMount() {
        // axios.get('/order.json')
        // .then(res=>{
        //     console.log(res.data)
        //     const fetchOrders = []
        //     for(let key in res.data)
        //     {
        //         fetchOrders.push({
        //             ...res.data[key],
        //             id:key
        //         })
        //     }

        //     this.setState({loading:false,orders:fetchOrders})
        //     // 
        // })
        // .catch(err=>{
        //     this.setState({loading:false})
        // })
        this.props.onFetchOrders()
    }

    render() {
        // console.log(this.state.orders)
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (<div>
                {this.props.orders.map(data => (
                    <Order key={data.id}
                        ingredients={data.ingredients}
                        price={data.price}
                    />
                ))}
                {/* <Order />
            <Order /> */}
            </div>)
        }
        return orders
    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionTypes.fetchOrders())
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));