import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckOutForm.css'
import axios from 'axios'
import { useState } from 'react';

const CheckoutForm = () => {
    const importe = 98
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if(!error) {
            const { id, card } = paymentMethod
            const date = new Date()
           
            try {
                const { data } = await axios.post('http://localhost:3001/venta/test', {
                    fecha: date,
                    //aqui va el valor multiplicado por 100 centavos
                    valor_total_venta: importe * 100,
                    id_usuario: 1,
                    detalle_venta: 111,
                    id_pago: id.toString(),
                })
                console.log(data)
                console.log(id)
                console.log(card.brand)
                elements.getElement(CardElement).clear()
                window.alert('GRACIAS POR TU COMPRA')
                window.location.replace('/');
            } catch (error) {
                
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