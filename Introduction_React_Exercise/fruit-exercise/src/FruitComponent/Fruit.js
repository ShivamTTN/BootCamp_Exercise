import React from 'react';
import './Fruit.css'

const FruitList = (props) => {
    return(
        <div className="fruitlist">
            <div>{props.name}</div> 
            <div>{props.age}</div> 
            <div><button onClick={props.delete}>DELETE</button></div> 
        </div>
    )
}

export default FruitList