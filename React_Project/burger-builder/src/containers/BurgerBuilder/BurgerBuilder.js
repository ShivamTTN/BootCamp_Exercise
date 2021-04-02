import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux'
// import * as actionTypes from '../../store/actions/actionTypes'
import * as actionTypes from '../../store/actions/index'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



const burgerBuilder = props => {

    // const [burgerPurchasable, setburgerPurchasable] = useState(false);
    const [burgerPurchasing, setburgerPurchasing] = useState(false);

    // ings: state.burderBuilder.ingredients,
    // total_price: state.burderBuilder.totalPrice,
    // error: state.burderBuilder.error,
    // isAuth: state.auth.token !== null,

    const ings = useSelector(state => {
        return state.burderBuilder.ingredients;
    })
    const total_price = useSelector(state => {
        return state.burderBuilder.totalPrice;
    })
    const error = useSelector(state => {
        return state.burderBuilder.error;
    })
    const isAuth = useSelector(state => {
        return state.auth.token !== null;
    })

    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actionTypes.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actionTypes.removeIngridient(ingName));
    const onInitIngredient = useCallback(() => dispatch(actionTypes.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actionTypes.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actionTypes.setAuthRedirectPath(path));


    // state = {

    //     purchasable: false,
    //     purchasing: false,
    //     // loading: false,
    //     // error: false,
    // }
    // const { onInitIngredient } = props;
    useEffect(() => {
        onInitIngredient()
    }, [onInitIngredient])
    // componentDidMount() {
    //     // axios.get('/ingredients.json')
    //     //     .then(res => {
    //     //         this.setState({ ingredients: res.data })
    //     //     })
    //     //     .catch(err => {
    //     //         // console.log(err);
    //     //         this.setState({ error: true });
    //     //     })
    //     // this.props.onInitIngredient()
    // }

    const isPerchaseableHandler = (updatedIngredient) => {

        const sum = Object.keys(updatedIngredient).map(
            (key) => {
                return updatedIngredient[key];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sum > 0;
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
    const purchasingHandler = () => {
        if (isAuth) {
            // setState({ purchasing: true });
            setburgerPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }

    }
    const purchasingCancleHandler = () => {
        setburgerPurchasing(false)
        // this.setState({ purchasing: false });
    }
    const purchasingContinueHandler = () => {
        //alert("Successfully Ordered !!!");
        // 
        // const queryParam = [];
        // for (let i in this.state.ingredients) {
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParam.push('price=' + this.state.totalPrice);
        // const queryString = queryParam.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        onInitPurchase();
        props.history.push('/checkout')

    }


    let disabledInfo = {
        ...ings
    };
    for (let i in disabledInfo) {
        disabledInfo[i] = disabledInfo[i] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p style={{ textAlign: 'center' }}><strong>Ingredient Cant Be Loaded</strong></p> : <Spinner />
    if (ings) {
        burger = (
            <Aux>
                {/* {console.log(ings)} */}
                <Burger ingredients={ings} />
                <BuildControls
                    price={total_price}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemove={onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    purchasable={isPerchaseableHandler(ings)}
                    ordered={purchasingHandler}
                    isAuth={isAuth}
                />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCancelled={purchasingCancleHandler}
            purchaseContinue={purchasingContinueHandler}
            price={total_price}
        />
    }
    // if (state.loading) {
    //     orderSummary = <Spinner />;
    // }

    return (
        <Aux>
            <Modal show={burgerPurchasing} closeModel={purchasingCancleHandler}>
                {orderSummary}
            </Modal>
            {burger}

        </Aux>
    )

}

// const mapStateToProps = state => {
//     return {
//         ings: state.burderBuilder.ingredients,
//         total_price: state.burderBuilder.totalPrice,
//         error: state.burderBuilder.error,
//         isAuth: state.auth.token !== null,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngridient(ingName)),
//         onInitIngredient: () => dispatch(actionTypes.initIngredients()),
//         onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));

export default (withErrorHandler(burgerBuilder, axios));