import React from 'react'
import classes from './Order.css'


const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            qty: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(i => {
        return (
            <span
                key={i.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin:'0 8px',
                    border:'1px solid #eee',
                    padding:'5px'
                }}
            >{i.name} ({i.qty})
            </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p> Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>Rs {props.price}</strong></p>
        </div>
    )
}
export default order