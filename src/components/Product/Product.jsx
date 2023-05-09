import { Link } from 'react-router-dom';
import s from './Product.module.css';

export default function Product({ nombre, imagen, valor, id_producto, Categoria_producto }) {
  return (
    <Link className={s.link} to={`/products/${id_producto}`}>
      <div className={s.container}>
        <div className={s.img_container} style={{backgroundImage: `url(${imagen})`}}></div>
        <div className={s.texto}>
          <h4 className={s.nombre}>{nombre}</h4>
          <h4 className={s.precio}>${valor}</h4>
        </div>
      </div>


      {/* <div className={styles.container}>
        <div className={styles.img}>
          <img src={imagen} alt={nombre} />
        </div>
        <div className={styles.text}>
          <span style={{ fontWeight: 'bolder' }}>{nombre}</span>
        </div>
        <div className={styles.precios}>
          <h3 className={styles.vNormal}>${valor}</h3>
        </div>
      </div> */}
    </Link>
  );
}
