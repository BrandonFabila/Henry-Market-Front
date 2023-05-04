import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CartCard from "../../components/cart-card/CartCard"
import { getUserById } from "../../store/actions/index"
import Cookies from "js-cookie";
//import jwt_decode from "jwt-decode";
import { mail } from "./user"
import { Navigate } from "react-router-dom"
import styles from './shopping.module.css'
import Pay from '../payment/Pay'


export default function ShoppingCart() {

  const dispatch = useDispatch()
  const id_user = JSON.parse(Cookies.get("user_session")).dataValues.id_usuario;
  const { carrito, countCarrito, } = useSelector((state) => state);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    const email = mail()
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    dispatch(getUserById(email))
    return () => {
      if(setShouldRedirect){
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("count", JSON.stringify(0));
      }
      setShouldRedirect(false);
    }
  }, [carrito, countCarrito, dispatch]);

  //Suma de subtotales
  let total = 0
  carrito.forEach(producto => {
    producto.valor_descuento ? 
      total = total + producto.valor_descuento * producto.cantidad
      :
      total = total + producto.valor * producto.cantidad 
  });

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
                  valor={producto.valor}
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
              
              <Pay 
                total={total}
                id_user={id_user}
                carrito={carrito}
                
              />

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
