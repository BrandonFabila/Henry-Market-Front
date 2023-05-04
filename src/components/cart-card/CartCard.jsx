import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCount, eliminarDelCarrito, restarCantidad, restarCount, sumarCantidad, sumarCount } from "../../store/actions/index"
import QuantityDisplay from "../quantitydisplay/QuantityDisplay";
import swal from "sweetalert";
import s from "./cartcard.module.css";

export default function CartCard(product) {
  const dispatch = useDispatch();

  function handleEliminarProducto() {
    dispatch(eliminarDelCarrito(product));
    dispatch(deleteCount(product.cantidad))
    console.log(product.cantidad);
  }

  const [quantity, setQuantity] = useState(product.cantidad);

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
      dispatch(restarCantidad(product));
      dispatch(restarCount())
    }
  };

  const handleIncrease = () => {
    if (quantity !== 10) {
      setQuantity(quantity + 1);
      dispatch(sumarCantidad(product))
      dispatch(sumarCount())
    } else {
      swal({
        title: 'Número máximo de unidades disponibles',
        icon: 'info'
      })
    }
  };

  return (
    <div >
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div className={s.container}>
              <div className={s.image}>
                <img src={product.imagen} alt={product.nombre} />
              </div>
              <div className={s.text}>
                <h3 className={s.name}>{product.nombre}</h3>
              </div>
              <div className={s.precio}>${product.valor_con_descuento} x unidad</div>
              <div className={s.quantity}>
              <QuantityDisplay
                quantity={product.cantidad}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
              </div>
              <div>
                <h3 style={{fontSize: "25px"}}>Subtotal ${product.valor_descuento*product.cantidad}</h3>
              </div>
              <div className={s.eliminar} onClick={handleEliminarProducto}>
                <IoTrashBinOutline size={20} />
              </div>
            </div>
          </div>
          <div style={{display:"flex", justifyContent: "center"}}>
            <hr style={{width:"90%"}}/>
          </div>
    </div>      
  );
}
