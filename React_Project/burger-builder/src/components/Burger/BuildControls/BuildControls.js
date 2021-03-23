import React from 'react';
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'


const controls = [
    { ingredient: 'Salad', type: 'salad' },
    { ingredient: 'Cheese', type: 'cheese' },
    { ingredient: 'Chicken', type: 'chicken' },
    { ingredient: 'Meat', type: 'meat' },
    

]

const buildControls = (props) =>{
    
    return(
    
        <div className={classes.BuildControls}>
            <p>Current Price : <strong> {props.price.toFixed(2)} </strong></p>
            {
                controls.map((ctrl) => (
                    <BuildControl
                        key={ctrl.ingredient}
                        ingredient={ctrl.ingredient}
                        add={() => props.ingredientAdded(ctrl.type)}
                        remove={() => props.ingredientRemove(ctrl.type)}
                        disable={props.disabledInfo[ctrl.type]}
                    />
                    
                ))
            }
            <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>Order Now</button>
    
        </div>
    );
} 

export default buildControls;