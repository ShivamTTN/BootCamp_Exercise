import * as actionTypes from './actions'

const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        // return {
        //     counter: state.counter + 1
        // }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBSTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
        case actionTypes.STORE:
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: state.counter })
            }
        case actionTypes.DELETE:
            // const id =2 
            // const newArray = [...state.results];
            // newArray.splice(id,1)
            const updatedArray = state.results.filter(res => res.id !== action.resultEleId)
            return {
                ...state,
                results: updatedArray

            }
        default:
            return state;

    }
}

export default reducer;
