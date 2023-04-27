import styles from './Product.module.css';

export default function Product({ nombre, imagen, valor }) {
  return (
    <div className={styles.box}>
      <h3>{nombre}</h3>
      <img src={imagen} alt="imagen del producto" height="260" />
      <h3>${valor}</h3>
    </div>
  );
}
