import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



class BurgerBuilder extends Component {
    state = {
       
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }
    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch(err => {
        //         // console.log(err);
        //         this.setState({ error: true });
        //     })
    }

    isPerchaseableHandler = (updatedIngredient) => {

        const sum = Object.keys(updatedIngredient).map(
            (key) => {
                return updatedIngredient[key];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sum > 0 ;
    }

    // addIngridientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    // updatedIngredient[type] = newCount;
    // const priceAddition = IngredientPrice[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    // this.setState({
    //     totalPrice: newPrice,
    //     ingredients: updatedIngredient
    // })
    // this.isPerchaseableHandler(updatedIngredient);
    // }

    // removeIngridientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     // if (oldCount <= 0) {
    //     //     return ;
    //     // }
    //     const newCount = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    // updatedIngredient[type] = newCount;
    // const removePrice = IngredientPrice[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice - removePrice;
    // this.setState({
    //     ingredients: updatedIngredient,
    //     totalPrice: newPrice
    // })
    // this.isPerchaseableHandler(updatedIngredient);

    //  }
    purchasingHandler = () => {
    //     this.setState({ purchasing: true });
    // }
    // purchasingCancleHandler = () => {
    //     this.setState({ purchasing: false });
    // }
    // purchasingContinueHandler = () => {
    //     //alert("Successfully Ordered !!!");
    //     // 
    //     const queryParam = [];
    //     for (let i in this.state.ingredients) {
    //         queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //     }
    //     queryParam.push('price=' + this.state.totalPrice);
    //     const queryString = queryParam.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        this.props.history.push('./checkout')

    }

    render() {
        let disabledInfo = {
            ...this.props.ings
        };
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: 'center' }}><strong>Ingredient Cant Be Loaded</strong></p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    {/* {console.log(this.props.ings)} */}
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.total_price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        purchasable={this.isPerchaseableHandler(this.props.ings)}
                        ordered={this.purchasingHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchasingCancleHandler}
                purchaseContinue={this.purchasingContinueHandler}
                price={this.props.total_price}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModel={this.purchasingCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        total_price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));