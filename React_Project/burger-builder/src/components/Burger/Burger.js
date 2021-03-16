import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import classes from './Burger.css'

const burger = (props) => {
    let tranformedIn = Object.keys(props.ingredients).map((igkey) => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient type={igkey} key={igkey + i} />;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    //console.log(tranformedIn);
    if(tranformedIn.length===0)
    {
        tranformedIn = <p>Please Add Ingredient <span role="img">&#x1F383;</span></p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/> */}
            {tranformedIn}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;