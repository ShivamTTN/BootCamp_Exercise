import * as actionTypes from './actions'

const IngredientPrice = {
    salad: 20,
    chicken: 60,
    cheese: 15,
    meat: 80,
}

const initial_state = {
    ingredients: {
        salad: 0,
        cheese: 0,
        chicken: 0,
        meat: 0,
        
    },
    totalPrice: 30,
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
        default:
            return state;
    }

}

export default reducer