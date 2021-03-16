import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentDidUpdate(){
        console.log('[OrderSummary] Updated ');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (<li key={key}><span style={{ textTransform: 'capitalize' }}>{key} </span>
            : {this.props.ingredients[key]}</li>)
        });
        return(
            <Aux>
            <h3>Your Order Summary</h3>
            <p>A <span role="img">&#127828;</span> with following content:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price}</strong></p>
            <p>Continue to Checkout ?</p>

            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue} >YES</Button>

        </Aux>
        )
    }
}

export default OrderSummary;
