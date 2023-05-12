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
  const estaLogueado = window.localStorage.getItem("estaLogueado");
  const dispatch = useDispatch()

  const [idUser, setIdUser] = useState('')

  const { carrito, countCarrito, } = useSelector((state) => state);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (estaLogueado === 'database') {
      const id_user = JSON.parse(Cookies.get("user_session")).dataValues.id_usuario;
      setIdUser(id_user)
      const email = mail()
      window.localStorage.setItem("carrito", JSON.stringify(carrito));
      window.localStorage.setItem("count", JSON.stringify(countCarrito));
      dispatch(getUserById(email))
      return () => {
        if (setShouldRedirect) {
          window.localStorage.setItem("carrito", JSON.stringify([]));
          window.localStorage.setItem("count", JSON.stringify(0));
        }
        setShouldRedirect(false);
      }
    } else {
      const google_id_user = JSON.parse(Cookies.get("user_session")).uid;
      setIdUser(google_id_user)
      window.localStorage.setItem("carrito", JSON.stringify(carrito));
      window.localStorage.setItem("count", JSON.stringify(countCarrito));
      return () => {
        if (setShouldRedirect) {
          window.localStorage.setItem("carrito", JSON.stringify([]));
          window.localStorage.setItem("count", JSON.stringify(0));
        }
        setShouldRedirect(false);
      }
    }
  }, [carrito, countCarrito, dispatch, estaLogueado]);

  //Suma de subtotales
  let total = 0
  let articles = 0
  carrito.forEach(producto => {
    articles += producto.cantidad
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
                  articulos={articles}
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

                  <div className={styles.foot} >
                    <div style={{ fontSize: "27px" }}>
                      <h3>{articles} Articulos</h3>
                    </div>
                  </div>

                  <div className={styles.foot} >
                    <div style={{ fontSize: "27px" }}>
                      <h3>Total:  ${total}</h3>
                    </div>
                  </div>

                </div>
              </div>

              <Pay
                total={total}
                id_user={idUser}
                carrito={carrito}
              />

            </div>
          ) : (
            <div className={styles.vacio}>
              <h1>Añade productos en el carrito.</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}
