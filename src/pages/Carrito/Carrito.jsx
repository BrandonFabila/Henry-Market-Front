import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CartCard from "../../components/cart-card/CartCard"
import enviarStock from "./enviarStock"
import { getUserById } from "../../store/actions/index"
import Cookies from "js-cookie";
//import jwt_decode from "jwt-decode";
import { clean } from "./clean"
import { date } from "./date"
import { mail } from "./user"
import axios from "axios"
import swal from "sweetalert"
import { Navigate } from "react-router-dom"
import styles from './shopping.module.css'


export default function ShoppingCart() {
  const dispatch = useDispatch()
  const { carrito, linkMercadoPago, countCarrito, } = useSelector((state) => state);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const email = mail()
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    dispatch(getUserById(email))
    return () => {
     // dispatch(); // aca va el metodo de pago 
      if(setShouldRedirect){
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("count", JSON.stringify(0));
      }
      setShouldRedirect(false);
    }
  }, [carrito]);
  //Suma de subtotales
  let total = 0
  carrito.forEach(producto => {
    total = total + producto.valor_descuento * producto.cantidad
  });

  //Boton de mercadoPago
 /* const handlerPago = async () => {
    const response = await fetch('http://localhost:3001/buy-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productos: carrito })
    });
    const data = await response.json();
    dispatch() // aca tambien va el metodo de pago

  }*/
  // console.log(usuario);
  //post a venta
  const handlerDetalleVenta = async () => {

    const session = Cookies.get("user_session");
    console.log(session)
    let values = JSON.parse(session)
    
    let cookieUsuario = values.dataValues
    // console.log(cookieUsuario, "USUARIO")
    
    const fecha = date();
    const detalle_venta = clean(carrito);
    const valor_total_venta = detalle_venta.reduce((a, b) => {
      return a + b.valor_total_cantidad
    }, 0)
    const venta = {
      fecha,
      valor_total_venta,
      id_usuario: cookieUsuario.id_usuario,
      detalle_venta,
      estado:false
    }
    await axios.post("http://localhost:3001/venta", venta)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        swal({
          title: "Ocurrio un error",
          text: `${error}`,
          icon: "error",
          timer: "3000"
        })
      })
    const stockActualizado = enviarStock(carrito)
    await axios.put("http://localhost:3001/products", stockActualizado)
    .then(response => {
      console.log(response.data);
      setShouldRedirect(true)
      window.location.reload()
    })
    .catch(error => {
      swal({
        title: "Ocurrio un error",
          text: `${error}`,
          icon: "error",
          timer: "3000"
      })
    })  
  }
  return (
    <>
    {shouldRedirect ? (
        <Navigate to="/" />
      ) : (
        <div style={{ marginTop: "100px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.titulo}>
              <h2>Carrito de compras</h2>
            </div>
          </div>
          {carrito.length ? (
            <div style={{ marginBottom: "120px" }}>
              {carrito.map(producto => (
                <CartCard
                  key={producto.id}
                  id_producto={producto.id_producto}
                  imagen={producto.imagen}
                  nombre={producto.nombre}
                  valor_descuento={producto.valor_descuento}
                  cantidad={producto.cantidad}
                  total={total}
                />
              ))}
              <div className={styles.containerTotal}>
                <div className={styles.total}>
                  <div style={{ fontSize: "30px", marginLeft: "15px" }}>
                    <h3>Total</h3>
                  </div>
                  <div style={{ fontSize: "30px", marginRight: "15px" }}>
                    <h3>${total}</h3>
                  </div>
                </div>
              </div>
              {linkMercadoPago ? (
                <div className={styles.mercadoPago}>
                 { /*<a
                    target="_blank"
                    onClick={handlerDetalleVenta}
                    href={linkMercadoPago}>Pagar</a>*/}
                </div>
              ) : (
                <button /*onClick={handlerPago}*/>Confirmar compra</button>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={styles.text}>
                <div>
                  <p>No hay productos en el carrito.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        )}
    </>
  );
}
