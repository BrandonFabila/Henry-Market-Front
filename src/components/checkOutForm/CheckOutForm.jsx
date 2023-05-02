import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckOutForm.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const importe = 1550
    const BACK_HOST = 'https://henry-market-back-production.up.railway.app/'
//   const BACK_HOST = "http://localhost:3001/"
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const navigateTo = (url) => {
        navigate(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(paymentMethod)
        if(!error) {
            const { id, card } = paymentMethod
            const date = new Date()
           
            try {
                const { data } = await axios.post(`${BACK_HOST}venta/test`, {
                    fecha: date,
                    //aqui va el valor multiplicado por 100 centavos
                    valor_total_venta: importe * 100,
                    id_usuario: 1,
                    detalle_venta: 111,
                    id_pago: id.toString(),
                })
                window.location.replace('/');
                elements.getElement(CardElement).clear()
                console.log(card.brand)
                console.log(id)
                console.log(data)
                swal({
                    title: 'Completo',
                    text: 'Gracias por tu compra!',
                    icon: 'success',
                    timer: '2000',
                    button: 'Accept'
                });
                navigateTo('/');

            } catch (error) {

                console.log(error.message)
            }
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='card card-body'>
            <div className='formgroup' >
                <h2>Importe a pagar: ${importe} MXN</h2>
            </div>
            
            <div className='formgroup' >
                <CardElement className='formcontrol' />
            </div>
            {/* { data !== null ? <p>{data}</p> : null } */}
            <button className='but' disabled={!stripe} >
                {loading ? (
                    <div className="wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                ) : 'Pagar'}
            </button>

        </form>
    )
}

export default CheckoutForm;