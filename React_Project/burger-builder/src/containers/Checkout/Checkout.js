import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactInfo from './ContactInfo/ContactInfo'

class Checkout extends Component {
    state = {
        // ingredients: {
        //     salad: 1,
        //     chicken: 1,
        //     cheese: 1,
        //     meat: 1
        // }
        ingredients:null,
        totalPrice:0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const paramIngredient = {}
        let price=0;
        for (let params of query.entries()) {
            // ['salad','1']
            if(params[0] === 'price')
            {
                price = +params[1];
            }
            else{
                paramIngredient[params[0]] = +params[1];
            }
            
        }
        this.setState({ ingredients: paramIngredient,totalPrice : price })
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info')
    }
    render() {
        return (
            <React.Fragment>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />

                <Route 
                path={this.props.match.path + '/contact-info'} 
                render={(props)=><ContactInfo ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
            </React.Fragment>
        )
    }
}

export default Checkout