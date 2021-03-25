import * as actionTypes from '../actions/actionTypes'

const IngredientPrice = {
    salad: 20,
    chicken: 60,
    cheese: 15,
    meat: 80,
}

const initial_state = {
    ingredients: null,
    totalPrice: 30,
    error:false,
}

const reducer = (state = initial_state, action) => {
    // console .log(action.ingredientName)

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + IngredientPrice[action.ingredientName]

            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice  - IngredientPrice[action.ingredientName]
            }

        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                // ingredients:action.ingredients,
                ingredients:{
                    salad:action.ingredients.salad,
                    cheese:action.ingredients.cheese,
                    chicken:action.ingredients.chicken,
                    meat:action.ingredients.meat
                },
                totalPrice:30,
                error:false
            }

        case actionTypes.FETCH_INGREDIENT_FAIL:
            return{
                ...state,
                error:true
            }

        default:
            return state;
    }

}

export default reducer