import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../store/actions/index';
import styles from './Detail.module.css';
import load from '../../media/loading.gif';


const Detail = () => {

    const { id_producto } = useParams();
    const { product } = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const imagen = load;
    console.log(id_producto);

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id_producto));
    setLoading(false);
  }, [dispatch, id_producto])

  return (
      <div>
        {loading ? (
            <img src={imagen} alt='loading...' />
        ) : (
            <div className={styles.container}>
                <div>
                        <Link to={"/Home"}>
                            <button>Back</button>
                        </Link>
                    </div>
                <div style={{ position: "relative" }}>
                    <div>
                    <img className={styles.image} src={product.imagen} alt={product.nombre} />
                    </div>
                </div>
            
            <hr style={{ height: '90%', margin: '20px' }} />

                <div style={{ maxWidth: '60%' }}>
                    <h1>{product.nombre}</h1>

                    <h4 className={styles.descripcion_producto}>{product.descripcion_producto}</h4>
                    <h5>Stock:{product.stock}</h5>
                </div>

                <div className={styles.precios}>
                  <h2 className={styles.valor}>${product.valor}</h2>
                </div>
            </div>
        )
        }
    </div>
  )
}

export default Detail