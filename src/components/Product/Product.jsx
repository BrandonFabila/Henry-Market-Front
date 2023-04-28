import { Link } from 'react-router-dom';
import styles from './Product.module.css';

export default function Product({ nombre, imagen, valor, id_producto, Categoria_producto }) {
  return (
    <Link className={styles.link} to={`/detail/${id_producto}`}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={imagen} alt={nombre} />
        </div>
        <div className={styles.precios}>
          <h3 className={styles.vNormal}>${valor}</h3>
        </div>
        <div className={styles.text}>
          <span style={{fontWeight: 'bolder'}}>{nombre}</span>
          <span style={{fontWeight: 'lighter'}}>{Categoria_producto.nombre_categoria_producto}</span>
        </div>
      </div>
    </Link>
  );
}
