import React from 'react'
import { Link } from 'react-router-dom'
import s from './cardOfert.module.css'

function CardOfert({ imagen, nombre, id, valor, valor_descuento }) {

  function calcPorcentaje(a, b) {
    const diferencia_precio = a - b
    const dividido = diferencia_precio / a
    const porcentaje = dividido * 100
    return Math.floor(porcentaje) + '%'
  }

  if (!valor_descuento) {
    return null; // si el producto no tiene valor_descuento, no se renderiza la tarjeta
  }

  return (
    <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
      <div className={s.container}>
        <div className={s.img_container} style={{ backgroundImage: `url(${imagen})` }}>
          <div>
            <h4 className={s.porcentaje}>-{calcPorcentaje(valor, valor_descuento)}</h4>
          </div>
        </div>

        <div className={s.texto}>
          <h4 className={s.nombre}>{nombre}</h4>          
          <div className={s.precios}>
            <div className={s.descuento}>
              <h5 className={s.valor}>${valor}</h5>
            </div>
            <div className={s.descuento}>
              <h5 className={s.valor_descuento}>${valor_descuento}</h5>
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default CardOfert
