import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys } from '../../store/actions/index';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"

function CardsCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getAllProducts());
  }, [dispatch])

  const { categorys } = useSelector(state => state);
   
  return (
    <div className={styles.container}>
      {categorys?.map((category, index) => {
        return <CardCategory
          key={index}
          id_categoria_producto={category.id_categoria_producto}
          nombre_categoria_producto={category.nombre_categoria_producto}
          imagen_categoria_producto={category.imagen_categoria_producto}
        />

      })}
    </div>
  )
}

export default CardsCategory