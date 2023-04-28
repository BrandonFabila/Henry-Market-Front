import { useState } from 'react';
import { useSelector } from 'react-redux';
import Product from '../Product/Product';
import styles from './Products.module.css';
import Loader from '../loader/loader';

export default function Products() {

  const {productsFitered, display} = useSelector((state) => state);
  
  const [numeroPagina, setNumeroPagina] = useState(1);

  const grupo = 9;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;

  const aux =
    productsFitered && productsFitered.slice
      ? productsFitered.slice(conteoInicial, conteoFinal)
      : [];

      

  const paginas = [];

  const numPaginas = Math.ceil(productsFitered.length / grupo);

  for (let i = 1; i <= numPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className={styles.container}>
      
      {display ? (
        <Loader />
      ) : (
        <>
          <div className={styles.product}>
            {aux.length ? aux.map((product, index) => (
             product.estado === false || product.existencia === 0 ? null 
             : <Product 
                  key={index}
                  nombre={product.nombre}
                  imagen={product.imagen}
                  valor={product.valor}
                  id_producto={product.id_producto}
                  Categoria_producto={product.Categoria_producto}
                  />
            )) : <div className={styles.alert} > <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVVJREFUSEvFlYFNBDEMBPc7gUqASoBKgErgKwEqASoBjZSNnFzi3CNeRDr5/s/xeteOc9CZ1+HM8bUH4FoSz1Wxn5LeJH0Vy/t0ZQAXkp5L0CwGgDeSsJs1A3iU9FC82XgM2QIMI+xtsfZhX7NGADH4k6TNphABkLuQzMa/B2DDRwkA7VTfAASj1yLTfdzXA+CE8yzz7xI0Y45clwaPjlClqI1DJ2kGAHsSxFb2EcDaZ7pnAOSyiREByB4WaPgy6csVgGtB7WDRHDSKCz30G/a0pBWAm6TKHBn8BQBJN0lEAHdQ1p4rBm4UJEbqRqI9RV7NxrTI8bDUPj6hTXG1CrVRokRxuFWKJwC4C2sH9RLxO46KrF17qcye/5sajo68C4XzatjFwzX0HwH0E9IXzHsYYh7ZHtfTZP7twrHGZOrHVybfYGVGv74yVz2/6/ueS39XoJnTD8PBXRlXJ52JAAAAAElFTkSuQmCC" alt='imagen de advertencia'/>
            <p>No hay coincidencias</p> </div>}
          </div>
          {productsFitered.length >= 9 && (
          
          <div>
            <div className={styles.paginadoAbj}>
              <div>
                <button
                  onClick={() => setNumeroPagina(numeroPagina - 1)}
                  disabled={numeroPagina === 1}
                >
                  ◄
                </button>
                {paginas.map((pagina) => (
                  <button
                    key={pagina}
                    className={`btnPag ${
                      pagina === numeroPagina ? "active" : ""
                    }`}
                    onClick={() => setNumeroPagina(pagina)}
                  >
                    {pagina}
                  </button>
                ))}
                <button
                  className="btnPag"
                  onClick={() => setNumeroPagina(numeroPagina + 1)}
                  disabled={
                    numeroPagina === Math.ceil(productsFitered?.length / grupo)
                  }
                >
                  ►
                </button>
              </div>
            </div>
          </div>
          )}
        </>
      )}
    </div>
  );
};
