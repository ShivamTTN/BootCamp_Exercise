import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        constructor(props) {
            super(props)
            this.reqInterceptor  = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
        }
        //***********************Deprecated**********************

        // componentWillMount() { 
        //     axios.interceptors.request.use(req => {
        //         this.setState({ error: null });
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, err => {
        //         this.setState({ error: err });
        //     });
        // }

        //***********************Deprecated**********************

        componentWillUnmount(){
            // console.log('will Unmount' , this.reqInterceptor , this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        closeErrorModal = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        closeModel={this.closeErrorModal}>

                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;