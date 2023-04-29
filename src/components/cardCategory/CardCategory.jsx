import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductByCategory } from '../../store/actions/index';
import s from './CardCategory.module.css'

function CardCategory({nombre_categoria_producto, imagen_categoria_producto}) {
    const dispatch = useDispatch();
  const handlerCategory = () => {
    dispatch(getProductByCategory(nombre_categoria_producto))
  }
 

  return (
    <Link className={s.card} to="/home" onClick={handlerCategory} >
      <div className={s.conttainer}>
        <div className={s.front}>
          <h4 className={s.nombre}>{nombre_categoria_producto}</h4>
          <img src={imagen_categoria_producto} alt={nombre_categoria_producto} className={s.img} />
        </div>
        <div className={s.back}>
          <div>
            <h3>Explorar más {nombre_categoria_producto} ...</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardCategory