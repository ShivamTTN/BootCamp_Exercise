import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const IngredientPrice = {
    salad: 20,
    chicken: 60,
    cheese: 15,
    meat: 80,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 30,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }
    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                // console.log(err);
                this.setState({ error: true });
            })
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
        //alert("Successfully Ordered !!!");
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'max',
        //         email: 'text@gmail.com',
        //         address: {
        //             street: 'ram chock',
        //             city: 'delhi',
        //             country: 'india'
        //         }
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/order.json', order)
        //     .then(res => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(err => {
        //         // console.log(err);
        //         this.setState({ loading: false, purchasing: false });
        //     })
        const queryParam = [];
        for(let i in this.state.ingredients)
        {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        })

    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: 'center' }}><strong>Ingredient Cant Be Loaded</strong></p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchasingCancleHandler}
                purchaseContinue={this.purchasingContinueHandler}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);