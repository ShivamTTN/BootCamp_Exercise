import React, { useEffect } from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {

    useEffect(() => {
        console.log('[OrderSummary] Updated ');
    }, [])

    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return (<li key={key}><span style={{ textTransform: 'capitalize' }}>{key} </span>
            : {props.ingredients[key]}</li>)
    });
    return (
        <Aux>
            <h3>Your Order Summary</h3>

            <p>A <span role="img" aria-label="burger">&#127828;</span> with following content:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to Checkout ?</p>

            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue} >YES</Button>

        </Aux>
    )
}

export default orderSummary;
