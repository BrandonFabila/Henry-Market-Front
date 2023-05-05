import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { mail } from "../Carrito/user"


// ACTIONS
import { getUserById } from "../../store/actions/index";

// ESTILOS
import styles from "./HistorialCompra.module.css";

const HistorialDeCompra = () => {
  const dispatch = useDispatch();
  const id_user = JSON.parse(Cookies.get("user_session")).dataValues.id_usuario;
  const {compras} = useSelector(state => state);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const email = mail()
    window.localStorage.setItem("carrito", JSON.stringify(compras));
    dispatch(getUserById(email));
    return () => {
      if(setShouldRedirect){
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("count", JSON.stringify(0));
      }
      setShouldRedirect(false);
    }
  }, [dispatch, compras]);

  return (
    <div className={styles.contenedor}>
      {shouldRedirect ? (
        <Navigate to="/" />
      ) : (

        <div className={styles.tabla}>
        <div className={styles.titulo}>
          <h1>Historial de compras:</h1>
        </div>
        {compras.length ? (
          <div>
            {compras.map((compra) => (
              <div key={compra._id}>
                <h3>Compra realizada el {compra.fecha}</h3>
                {compra.Detalle_venta.map((detalle) => (
                  <div className={styles.detalle} key={detalle.Producto._id}>
                    <img className={styles.img} src={detalle.Producto.imagen} alt={detalle.Producto.nombre}/>
                    <label className={styles.aux}>{detalle.Producto.nombre}</label>
                    <label className={styles.aux}>
                      $: {detalle.Producto.valor_con_descuento}
                    </label>
                    <label className={styles.aux}>Cant: {detalle.cantidad}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron compras realizadas</p>
          )}
      </div>
      )
      }
    </div>
  );
};

export default HistorialDeCompra;