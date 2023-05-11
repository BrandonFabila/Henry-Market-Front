import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import FormComent from "./FormComent";

// ACTIONS
import { getShopping } from "../../store/actions/index";

// ESTILOS
import styles from "./HistorialCompra.module.css";

const HistorialDeCompra = () => {
  const dispatch = useDispatch();
  const id_user = JSON.parse(Cookies.get("user_session")).dataValues.id_usuario;
  const { compras } = useSelector((state) => state);

  useEffect(() => {
    // window.localStorage.setItem("compras", JSON.stringify(compras))
    dispatch(getShopping());
  }, [dispatch]);

 // Filtrar las compras del usuario logueado
 const comprasUsuario = compras.length
 ? compras.filter(
     (compra) =>
       compra.Usuario.id_usuario === id_user &&
       compra.Detalle_venta.length > 0 // Solo compras con detalles de venta
   )
 : [];
  const [showComent, setShowComent] = useState({});

  const handleLogInClick = (id_detalle_venta) => {
    setShowComent((prevState) => ({
      ...prevState,
      [id_detalle_venta]: !prevState[id_detalle_venta]
    }));
  };
  

console.log(comprasUsuario)
  return (
    <div className={styles.contenedor}>
      <div className={styles.tabla}>
        <div className={styles.titulo}>
          <h1>Historial de compras:</h1>
        </div>
        {comprasUsuario.length ? (
          <div>
            {comprasUsuario.map((compra) => (
              <div key={compra.id_detalle_venta}>
                <div className={styles.fecha} >
                  <h3 style={{background:'rgb(248, 245, 45)', color:'black'}}>Compra realizada el {compra.fecha}</h3>
                </div>
                {compra.Detalle_venta.map((detalle) => (
                  <div className={styles.detalle} key={detalle.Producto.id_producto}>
                    <div >
                      <img className={styles.img} src={detalle.Producto.imagen} alt={detalle.Producto.nombre}/>
                    </div>
                    <div className={styles.nomP} >
                      <h4 >{detalle.Producto.nombre}</h4>
                    </div>
                    <div className={styles.aux} >
                      <h4>
                        ${detalle.Producto.valor_descuento || detalle.Producto.valor} x unidad
                      </h4>
                    </div>
                    <div className={styles.aux} >
                      <h4>
                        Cant: {detalle.cantidad}
                      </h4>
                    </div>  
                    <div>
                      <h4 className={styles.aux}>
                        Total: ${detalle.valor_total_cantidad}
                      </h4>
                    </div>  
                    
                    
                    {detalle.comentado === false ? 
                    <div className={styles.divcom} >
                      <button 
                        className={styles.combut} 
                        onClick={() => handleLogInClick(detalle.id_detalle_venta)}
                      >
                        <img src="https://www.svgrepo.com/show/489238/add-comment.svg" alt="comenta" className={styles.coment} />
                      </button>
                      {showComent[detalle.id_detalle_venta] && 
                        <FormComent 
                          key={detalle.id_detalle_venta}
                          mostrarProp={true} 
                          idUsuario={id_user}
                          id_detalle_venta={detalle.id_detalle_venta}
                          id_venta={detalle.id_venta}
                          producto={detalle.Producto.nombre} 
                          id_producto={detalle.id_producto}
                          showComent={setShowComent}
                          />
                        }
                    </div> 
                    : 
                    null }
                    

                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <h4>No se encontraron compras realizadas</h4>
        )}
      </div>
    </div>
  );
};

export default HistorialDeCompra;