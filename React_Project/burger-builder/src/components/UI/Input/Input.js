import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputEle = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputEle = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputEle = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
    
        case ('select'):
            inputEle = (
                <select
                    className={inputClasses.join(' ')}
                    // {...props.elementConfig}
                    value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.vaue} > {option.displayValue} </option>
                    ))}

                </select>);
            break;
        default:
            inputEle = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEle}
            {validationError}
        </div>
    )
}

export default input