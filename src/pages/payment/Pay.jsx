// import styles from './Pay.module.css';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkOutForm/CheckOutForm';
import './Pay.css'

const Pay = (props) => {
    const stripePromise = loadStripe('pk_test_51N1sldEH19RIhUwUefJlIiQFZTVpUq1EJqNZKrKHlQjJBrAPjz7v2SEimI7ufFmu2N6jerJqc4zIOPkq4ZghmjUZ00XluhI7ep')
    const { total, id_user, carrito } = props;

    return (
            <Elements  stripe={stripePromise} >
                <h1>Ingresa los datos de tu tarjeta</h1>
                <div className='container p-4'>
                    <div className='row'>
                        <div className='col-md-4 offset-md-4'>
                            <CheckoutForm 
                                total={total}
                                id_user={id_user}
                                carrito={carrito}
                            />
                        </div>
                    </div>
                </div>
            </Elements>
    );
}

export default Pay;

