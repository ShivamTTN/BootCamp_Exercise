import React, { Component } from "react";

import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/index'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
// import { element } from "prop-types";

import { updateObject, checkValidity } from '../../../shared/utility'

class ContactInfo extends Component {

    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Name',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Email',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Street',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Zip Code',
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid City',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Country',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },

                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        // loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });
        console.log(this.props.ings);
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // this.setState({ loading: true });
        const order = {
            ingredients: this.props.ings,
            price: this.props.total_price,
            orderData: formData,
            userId: this.props.userId
            // customer: {
            //     name: 'max',
            //     email: 'text@gmail.com',
            //     address: {
            //         street: 'ram chock',
            //         city: 'delhi',
            //         country: 'india'
            //     }
            // },
            // deliveryMethod: 'fastest'
        }

        this.props.onOrderBurger(order, this.props.token)
        // axios.post('/order.json', order)
        //     .then(res => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         // console.log(err);
        //         this.setState({ loading: false });
        //     })
    }


    inputChangedhandler = (event, identifier) => {

        const updatedElement = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedElement
        })
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(ele => (
                    <Input
                        key={ele.id}
                        elementType={ele.config.elementType}
                        elementConfig={ele.config.elementConfig}
                        value={ele.config.value}
                        changed={(event) => this.inputChangedhandler(event, ele.id)}
                        invalid={!ele.config.valid}
                        shouldValidate={ele.config.validation}
                        touched={ele.config.touched}
                        errorMessage={ele.config.errorMessage}
                    />
                ))}


                {/* <Input inputtype='input' type="text" name='email' placeholder='Your Email' />
                <Input inputtype='input' type="text" name='cname' placeholder='Your Name' />
                <Input inputtype='input' type="text" name='postal' placeholder='Your Postal Code' /> */}

                <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
            </form>);
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactInfo} >
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burderBuilder.ingredients,
        total_price: state.burderBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.burgerPurchase(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios));