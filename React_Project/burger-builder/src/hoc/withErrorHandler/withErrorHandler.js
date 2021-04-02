import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // const [error, setError] = useState(null)
        // // state = {
        // //     error: null
        // // }
        // // constructor(props) {
        // //     super(props)
        // //     this.reqInterceptor = axios.interceptors.request.use(req => {
        // //         this.setState({ error: null });
        // //         return req;
        // //     });
        // //     this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        // //         this.setState({ error: err });
        // //     });
        // // }
        // const reqInterceptor = axios.interceptors.request.use(req => {
        //     // this.setState({ error: null });
        //     setError(null)
        //     return req;
        // });
        // const resInterceptor = axios.interceptors.response.use(res => res, err => {
        //     // this.setState({ error: err });
        //     setError(err)
        // });
        // //***********************Deprecated**********************

        // // componentWillMount() { 
        // //     axios.interceptors.request.use(req => {
        // //         this.setState({ error: null });
        // //         return req;
        // //     });
        // //     axios.interceptors.response.use(res => res, err => {
        // //         this.setState({ error: err });
        // //     });
        // // }

        // //***********************Deprecated**********************

        // // componentWillUnmount(){
        // //     // console.log('will Unmount' , this.reqInterceptor , this.resInterceptor)
        // //     axios.interceptors.request.eject(this.reqInterceptor)
        // //     axios.interceptors.response.eject(this.resInterceptor)
        // // }

        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(reqInterceptor)
        //         axios.interceptors.response.eject(resInterceptor)
        //     }
        // }, [reqInterceptor, resInterceptor])

        // const closeErrorModal = () => {
        //     // this.setState({ error: null })
        //     setError(null)
        // }

        const [error, closeErrorModal] = useHttpErrorHandler(axios)

        return (
            <Aux>
                <Modal show={error}
                    closeModel={closeErrorModal}>

                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )

    }
}

export default withErrorHandler;