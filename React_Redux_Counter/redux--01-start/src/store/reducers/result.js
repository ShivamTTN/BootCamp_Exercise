import * as actionTypes from '../actions'

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.STORE:
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.result })
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
