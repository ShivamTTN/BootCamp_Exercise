import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/order.json')
        .then(res=>{
            console.log(res.data)
            const fetchOrders = []
            for(let key in res.data)
            {
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            
            this.setState({loading:false,orders:fetchOrders})
            // 
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }

    render() {
        // console.log(this.state.orders)
        return (
            <div>
                {this.state.orders.map(data=>(
                    <Order key={data.id}
                    ingredients={data.ingredients}
                    price={data.price}
                    />
                ))}
                {/* <Order />
                <Order /> */}
            </div>
        )
    }

}
export default withErrorHandler(Orders,axios);