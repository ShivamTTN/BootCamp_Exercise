import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactInfo from './ContactInfo/ContactInfo'

class Checkout extends Component {

    // state = {
    //     // ingredients: {
    //     //     salad: 1,
    //     //     chicken: 1,
    //     //     cheese: 1,
    //     //     meat: 1
    //     // }
    //     ingredients:null,
    //     totalPrice:0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const paramIngredient = {}
    //     let price=0;
    //     for (let params of query.entries()) {
    //         // ['salad','1']
    //         if(params[0] === 'price')
    //         {
    //             price = +params[1];
    //         }
    //         else{
    //             paramIngredient[params[0]] = +params[1];
    //         }

    //     }
    //     this.setState({ ingredients: paramIngredient,totalPrice : price })
    // }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info')
    }
    render() {
        let summary = <Redirect to='/' />

        if (this.props.ings) {
            let purchasedRedirect = this.props.purchased ? <Redirect to='/' /> :  null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-info'}
                        // render={(props)=><ContactInfo ingredients={this.props.ings} price={this.props.total_price} {...props} />} 
                        component={ContactInfo}
                    />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burderBuilder.ingredients,
        purchased:state.order.purchased
        // total_price : state.totalPrice
    }
}




export default connect(mapStateToProps)(Checkout);