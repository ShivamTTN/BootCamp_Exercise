import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const IngredientPrice = {
    salad: 20,
    chicken: 60,
    cheese: 15,
    meat: 80,
}

const initial_state = {
    ingredients: null,
    totalPrice: 30,
    error: false,
    building: false
}

const addIng = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + IngredientPrice[action.ingredientName],
        building:true
    }

    return updateObject(state, updatedState)
}
const removeIng = (state, action) => {
    const updatedIngredientRem = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredientsRem = updateObject(state.ingredients, updatedIngredientRem)
    const updatedStateRem = {
        ingredients: updatedIngredientsRem,
        totalPrice: state.totalPrice - IngredientPrice[action.ingredientName],
        building:true
    }

    return updateObject(state, updatedStateRem)
}
const setIng = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            chicken: action.ingredients.chicken,
            meat: action.ingredients.meat
        },
        totalPrice: 30,
        error: false,
        building:false
    })
}


const reducer = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIng(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIng(state, action)
        case actionTypes.SET_INGREDIENT: return setIng(state, action)
        case actionTypes.FETCH_INGREDIENT_FAIL: return updateObject(state, { error: true })
        default: return state;
    }
}

export default reducer