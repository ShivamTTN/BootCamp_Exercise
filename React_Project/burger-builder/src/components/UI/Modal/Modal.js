import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.show !== this.props.show)
        {
            return true;
        }
        else
        {
            return false;
        }
    }   
    render(){
        return(
            <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closeModel} />
        <div
            className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0',
            }}
        >
            {this.props.children}
        </div>
    </Aux>
        )
    }
}
export default Modal