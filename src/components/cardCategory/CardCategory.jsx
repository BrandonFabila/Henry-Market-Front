import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './CardCategory.module.css'
import { getProductFiltered } from '../../store/actions';

function CardCategory({ id_categoria_producto, nombre_categoria_producto, imagen_categoria_producto }) {
  const dispatch = useDispatch();

  const handlerCategory = () => {
    dispatch(getProductFiltered(id_categoria_producto));
  }

  return (
    <Link className={s.link} to={`/products/categoria/${id_categoria_producto}`} onClick={handlerCategory} >
      <div className={s.container}>
        <h4 className={s.nombre}>{nombre_categoria_producto}</h4>
        <div className={s.box}>
          <div style={{ backgroundImage: `url(${imagen_categoria_producto})` }} className={s.imagen}></div>
        </div>
        <span className={s.vermas}>Explorar más...</span>
      </div>
    </Link>
  )
}

export default CardCategory;
