
import { useReducer, useCallback } from 'react'

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
        case 'RESPONSE':
            return { ...httpState, loading: false, data: action.responseData, extra: action.extra }
        case 'ERROR':
            return { loading: false, error: action.errorData }
        case 'CLEAR':
            return initialState
        default:
            throw new Error('not be here')
    }
}

const useHttps = () => {
    const [httpStates, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => {
        dispatchHttp({ type: 'CLEAR' })
    }, [])

    const sendReqest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier })
        fetch(url,
            {
                method: method,
                body: body,
                header: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(res => {
                dispatchHttp({ type: 'RESPONSE', responseData: res, extra: reqExtra })
            })
            .catch(err => {
                dispatchHttp({ type: 'ERROR', errorData: err.message })
            })
    }, [])
    return {
        isLoading: httpStates.loading,
        data: httpStates.data,
        error: httpStates.error,
        sendReqest: sendReqest,
        reqExtra: httpStates.extra,
        reqIdentifier: httpStates.identifier,
        clear: clear
    }
}

export default useHttps