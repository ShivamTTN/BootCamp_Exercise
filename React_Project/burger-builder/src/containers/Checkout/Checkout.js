import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactInfo from './ContactInfo/ContactInfo'

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            chicken: 1,
            cheese: 1,
            meat: 1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const paramIngredient = {}
        for (let params of query.entries()) {
            paramIngredient[params[0]] = +params[1];
        }
        this.setState({ ingredients: paramIngredient })
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

                <Route path={this.props.match.path + '/contact-info'} component={ContactInfo} />
            </React.Fragment>
        )
    }
}

export default Checkout