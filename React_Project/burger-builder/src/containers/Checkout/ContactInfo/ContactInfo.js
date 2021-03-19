import React,{ Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css'

class ContactInfo extends Component{

    state = {
        cname : '',
        email : '',
        address : {
            street:'',
            postalCode:''
        }
    }

    render(){
        return(
            <div className={classes.ContactInfo} >
                <h4>Enter Your Contact Information</h4>
                <form>
                    <input type="text" name='cname' placeholder='Your Name' />
                    <input type="text" name='email' placeholder='Your Email' />
                    <input type="text" name='street' placeholder='Your Street' />
                    <input type="text" name='postal' placeholder='Your Posta Code' />

                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactInfo