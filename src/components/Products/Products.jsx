import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions';
import Product from '../Product/Product';
import styles from './Products.module.css';

export default function Products() {
  const products = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {products.map((e) => {
        return (
          <Product
            nombre={e.nombre}
            descripcion={e.descripcion_producto}
            stock={e.stock}
            valor={e.valor}
            valorDescuento={e.valor_descuento}
            imagen={e.imagen}
            idCategoria={e.id_categoria_producto}
            estado={e.estado}
          />
        );
      })}
    </div>
  );
}
