import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(res => res.id !== action.resultEleId)
    return updateObject(state, { results: updatedArray })
}


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.STORE:
            return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result }) })
        // return {
        //     ...state,
        //     results: state.results.concat({ id: new Date(), value: action.result })
        // }
        case actionTypes.DELETE:
            return deleteResult(state, action)
        // const id =2 
        // const newArray = [...state.results];
        // newArray.splice(id,1)

        // return {
        //     ...state,
        //     results: updatedArray

        // }
        default:
            return state;

    }
}

export default reducer;
