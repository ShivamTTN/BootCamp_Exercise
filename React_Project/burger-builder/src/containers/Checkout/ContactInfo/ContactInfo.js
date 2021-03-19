import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactInfo extends Component {

    state = {
        cname: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'max',
                email: 'text@gmail.com',
                address: {
                    street: 'ram chock',
                    city: 'delhi',
                    country: 'india'
                }
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/order.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                // console.log(err);
                this.setState({ loading: false });
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name='cname' placeholder='Your Name' />
                <input className={classes.Input} type="text" name='email' placeholder='Your Email' />
                <input className={classes.Input} type="text" name='street' placeholder='Your Street' />
                <input className={classes.Input} type="text" name='postal' placeholder='Your Posta Code' />

                <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
            </form>);
        if (this.state.loading) {
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

export default ContactInfo