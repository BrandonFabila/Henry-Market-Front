// import styles from './Pay.module.css';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkOutForm/CheckOutForm';
import './Pay.css'

const Pay = () => {
    const stripePromise = loadStripe('pk_test_51N1sldEH19RIhUwUefJlIiQFZTVpUq1EJqNZKrKHlQjJBrAPjz7v2SEimI7ufFmu2N6jerJqc4zIOPkq4ZghmjUZ00XluhI7ep')

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    // };

    // const CheckoutForm = () => {
    //     return (
    //         <form >
    //             <CardElement />
    //         </form>
    //     )
    // }



    return (
            <Elements  stripe={stripePromise} >
                <h1>Inserta una tarjeta</h1>
                <div className='container p-4'>
                    <div className='row'>
                        <div className='col-md-4 offset-md-4'>
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </Elements>
    );
}

export default Pay;

