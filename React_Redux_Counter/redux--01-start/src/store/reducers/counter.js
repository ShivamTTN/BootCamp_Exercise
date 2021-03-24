import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.INCREMENT:
            //1st WAY using object assign for making new immutable object

            //     const newState = Object.assign({}, state);
            //     newState.counter = state.counter + 1;
            //     return newState;

            //2nd WAY using object return

            // return {
            //     counter: state.counter + 1
            // }

            //3rd WAY using function
            return updateObject(state, { counter: state.counter + 1 })

        case actionTypes.DECREMENT:
            return updateObject(state, { counter: state.counter - 1 })

        case actionTypes.ADD:
            return updateObject(state, { counter: state.counter + action.value })

        case actionTypes.SUBSTRACT:
            return updateObject(state, { counter: state.counter - action.value })

        default:
            return state;

    }
}

export default reducer;
