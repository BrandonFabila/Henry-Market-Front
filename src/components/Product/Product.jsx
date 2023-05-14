import { Link } from 'react-router-dom';
import s from './Product.module.css';

export default function Product({ nombre, imagen, valor, id_producto, valor_descuento }) {

  function calcPorcentaje(a, b) {
    const diferencia_precio = a - b
    const dividido = diferencia_precio / a
    const porcentaje = dividido * 100
    return Math.floor(porcentaje) + '%'
  }

  return (
    <Link className={s.link} to={`/products/${id_producto}`}>
      <div className={s.container}>
        <div className={s.img_container} style={{ backgroundImage: `url(${imagen})` }}>
          {
            valor_descuento && (
              <div>
                <h4 className={s.porcentaje}>-{calcPorcentaje(valor, valor_descuento)}</h4>
              </div>
            )
          }
        </div>
        <div className={s.texto}>
          <h4 className={s.nombre}>{nombre}</h4>
          <h4 className={s.precio}>${valor}</h4>
        </div>
      </div>
    </Link>
  );
}
