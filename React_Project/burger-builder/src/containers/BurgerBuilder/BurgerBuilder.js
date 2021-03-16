import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const IngredientPrice = {
    salad: 20,
    chicken: 60,
    cheese: 15,
    meat: 80,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            chicken: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 30,
        purchasable: false,
        purchasing: false
    }

    isPerchaseableHandler = (updatedIngredient) => {

        const sum = Object.keys(updatedIngredient).map(
            (key) => {
                return updatedIngredient[key];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({ purchasable: sum > 0 });
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newCount;
        const priceAddition = IngredientPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        })
        this.isPerchaseableHandler(updatedIngredient);
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if (oldCount <= 0) {
        //     return ;
        // }
        const newCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newCount;
        const removePrice = IngredientPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - removePrice;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        })
        this.isPerchaseableHandler(updatedIngredient);

    }
    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }
    purchasingCancleHandler = () => {
        this.setState({ purchasing: false });
    }
    purchasingContinueHandler = () => {
        alert("Successfully Ordered !!!");
        this.purchasingCancleHandler();
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModel={this.purchasingCancleHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled = {this.purchasingCancleHandler}
                        purchaseContinue = {this.purchasingContinueHandler}
                        price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngridientHandler}
                    ingredientRemove={this.removeIngridientHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                />

            </Aux>
        )
    }
}

export default BurgerBuilder;