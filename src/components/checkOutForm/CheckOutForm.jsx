import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckOutForm.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { vaciarCarrito } from '../../store/actions';

const CheckoutForm = (props) => {
  const api_host = 'https://henry-market-back-production.up.railway.app/'
 // const api_host = "http://localhost:3001/"
  const dispatch = useDispatch();

    const { total, id_user, carrito } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const navigateTo = (url) => {
        navigate(url);
    }
    console.log(carrito)
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
            const idString = id.toString()
                    window.localStorage.setItem("carrito", JSON.stringify([]));
                    window.localStorage.setItem("count", JSON.stringify(0));
            try {
                const { data } = await axios.post(`${api_host}venta`, {
                    fecha: date,
                    //aqui va el valor multiplicado por 100 centavos
                    valor_total_venta: total * 100,
                    id_usuario: id_user,
                    detalle_venta: carrito,
                    id_pago: idString,
                
                })
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
                  }).then(() => {
                    // Llama a la acción vaciarCarrito para vaciar el carrito
                    dispatch(vaciarCarrito());
                    navigateTo('/');
                  });
            } catch (error) {

                console.log(error.message)
            }
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='card card-body'>
            <div className='formgroup' >
                <h2>Pagar {total} USD</h2>
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