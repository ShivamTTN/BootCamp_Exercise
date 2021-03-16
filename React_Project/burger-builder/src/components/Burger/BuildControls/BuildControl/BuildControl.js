import React from 'react'

import classes from './BuildControl.css'

const buildControl = (props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.ingredient}</div>
        <button className={classes.Less} disabled = {props.disable} onClick={props.remove}>Less</button>
        <button className={classes.More}  onClick={props.add}>More</button>
    </div>
);
export default buildControl;