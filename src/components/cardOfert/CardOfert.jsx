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
      <div className={s.container} style={{ backgroundImage: `url(${imagen})`, }}>
        <div className={s.text}>
          <h4 className={s.nombre}>{nombre}</h4>
          <h1 className={s.descuento}>{calcPorcentaje(valor, valor_descuento)}</h1>
        </div>
      </div>
    </Link>
  )
}

export default CardOfert
