import * as actionTypes from './actionTypes'


export const saveRes = (res)=>{
    return {
        type: actionTypes.STORE,
        result:res
    }
}

export const storeRes = (res) => {
    return (dispatch,getState) =>{
        
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter;
            // console.log(oldCounter)
            dispatch(saveRes(res))
        }, 2000);
    }
    
}

export const deleteRes = (id) => {
    return {
        type: actionTypes.DELETE,
        resultEleId:id
    }
}
