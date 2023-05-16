import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductFiltered } from '../../store/actions';
import s from './CardCategory.module.css'

function CardCategory({ id_categoria_producto, nombre_categoria_producto, imagen_categoria_producto }) {
  const dispatch = useDispatch();

  const handlerCategory = () => {
    dispatch(getProductFiltered(id_categoria_producto));
  }

  return (
    <Link className={s.card} to={`/products/categoria/${id_categoria_producto}`} onClick={handlerCategory} >
    
      <div className={s.conttainer}>
        <div className={s.front} style={{ backgroundImage: `url(${imagen_categoria_producto})` }}>
          <h4 className={s.nombre}>{nombre_categoria_producto}</h4>
        </div>
        <div className={s.back}>
          <div>
            <h3 className={s.back_text}>Explorar más en {nombre_categoria_producto}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardCategory;
