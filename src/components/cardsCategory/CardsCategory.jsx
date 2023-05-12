import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys } from '../../store/actions/index';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"
import banner from '../../media/banner.jpg'

function CardsCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getAllProducts());
  }, [dispatch])

  const { categorys } = useSelector(state => state);
  const primeras = categorys.slice(0, 2)
  const demas = categorys.slice(2)
  return (
    <div className={styles.container}>
      <div className={styles.box} style={{justifyContent: 'space-evenly'}}>
        {primeras?.map((category, index) => {
          return <CardCategory
            key={index}
            id_categoria_producto={category.id_categoria_producto}
            nombre_categoria_producto={category.nombre_categoria_producto}
            imagen_categoria_producto={category.imagen_categoria_producto}
          />
        })}
      </div>
        <div style={{width: '100%', margin: '40px 0px', backgroundPosition: 'center center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url(${banner})`, height: '180px'}}></div>
      <div className={styles.box}>
        {demas?.map((category, index) => {
          return <CardCategory
            key={index}
            id_categoria_producto={category.id_categoria_producto}
            nombre_categoria_producto={category.nombre_categoria_producto}
            imagen_categoria_producto={category.imagen_categoria_producto}
          />
        })}
      </div>

    </div>
  )
}

export default CardsCategory