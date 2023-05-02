import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../store/actions/index';
import styles from './Detail.module.css';
import Loader from '../../components/loader/loader';


const Detail = () => {

    const { id_producto } = useParams();
    const { product } = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id_producto)).finally(() => setLoading(false));
  }, [dispatch, id_producto])

  return (
      <div>
        {loading ? (
            <Loader/>
        ) : (
            <div className={styles.mainContainer}>
                <div className={styles.back}>
                  <Link to={`/products/categoria/${product.id_categoria_producto}`}>
                      <button className={styles.button} >atrás</button>
                  </Link>
                </div>
                <div className={styles.title}>
                    <h1>{product.nombre}</h1>
                </div>
                <div className={styles.container}>
                  <div className={styles.imgContainer}>
                      <img className={styles.image} src={product.imagen} alt={product.nombre} />
                  </div>
                  <div className={styles.information}>
                      <h4 className={styles.descripcion_producto}>{product.descripcion_producto}</h4>
                      <h5>Stock: {product.stock > 1 ? 'Disponible ✔' : 'No hay Existencias ✘' }</h5>
                      <h2 className={styles.valor}>${product.valor}</h2>
                  </div>
                </div>
            </div>
        )
        }
    </div>
  )
}

export default Detail