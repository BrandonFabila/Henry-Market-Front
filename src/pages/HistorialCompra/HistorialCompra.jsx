import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// ACTIONS
import { getShopping, getUsuarioByEmail } from "../../store/actions/index";

// ESTILOS
import styles from "./HistorialCompra.module.css";

const HistorialDeCompra = () => {
  const dispatch = useDispatch();

  const {compras} = useSelector(state => state)
  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;

  useEffect(() => {
    dispatch(getUsuarioByEmail(email))
    dispatch(getShopping());
  }, [dispatch, email]);

  // Filtrar las compras del usuario logueado
  const comprasUsuario = compras.length ? compras.filter((compras) => compras.Usuario.email === email) : ""

  return (
    <div className={styles.contenedor}>
      <div className={styles.tabla}>
        <div className={styles.titulo}>
          <h1>Historial de compras:</h1>
        </div>
        {comprasUsuario.length ? (
          <div>
            {comprasUsuario.map((compra) => (
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
    </div>
  );
};

export default HistorialDeCompra;