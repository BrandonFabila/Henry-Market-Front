import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

// ACTIONS
import { getShopping } from "../../store/actions/index";

// ESTILOS
import styles from "./HistorialCompra.module.css";

const HistorialDeCompra = () => {
  const dispatch = useDispatch();
  const id_user = JSON.parse(Cookies.get("user_session")).dataValues.id_usuario;
  const {compras} = useSelector(state => state)

  useEffect(() => {
    // window.localStorage.setItem("compras", JSON.stringify(compras))
    dispatch(getShopping());
  }, [dispatch]);

  // Filtrar las compras del usuario logueado
  const comprasUsuario = compras.length ? compras.filter((compras) => compras.Usuario.id_usuario === id_user) : ""

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
                  <div className={styles.detalle} key={detalle.Producto.id_producto}>
                    <img className={styles.img} src={detalle.Producto.imagen} alt={detalle.Producto.nombre}/>
                    <label className={styles.aux}>{detalle.Producto.nombre}</label>
                    <label className={styles.aux}>
                      $: {detalle.Producto.valor_descuento || detalle.Producto.valor}
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