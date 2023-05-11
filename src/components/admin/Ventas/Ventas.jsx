import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopping } from '../../../store/actions';
import styles from './Ventas.module.css';

export default function Ventas(){
    const compras = useSelector(state => state.compras) ?? [];
    const dispatch = useDispatch();
    const [numeroPagina, setNumeroPagina] = useState(1);

    useEffect(() => {
        dispatch(getShopping());
    }, [dispatch]);

    const grupo = 6;
    const conteoFinal = numeroPagina * grupo;
    const conteoInicial = conteoFinal - grupo;
    
    const aux = compras && compras.slice
        ? compras.slice(conteoInicial, conteoFinal)
        : [];

    const MAX_PAGES = 8;
    const paginas = [];
    const numPaginas = Math.ceil(compras.length / grupo);

    if (numPaginas > MAX_PAGES) {
        let startPage = Math.max(1, numeroPagina - Math.floor(MAX_PAGES / 2));
        let endPage = Math.min(numPaginas, startPage + MAX_PAGES - 1);
        for (let i = startPage; i <= endPage; i++) {
          paginas.push(i);
        }
      } else {
        for (let i = 1; i <= numPaginas; i++) {
          paginas.push(i);
        }
      }

    const allPages = Array.from({ length: numPaginas }, (_, index) => index + 1);

    let pagesToShow = allPages;
  
    if (numPaginas > MAX_PAGES) {
        const startPage = Math.max(numeroPagina - Math.floor(MAX_PAGES / 2), 1);
        const endPage = Math.min(startPage + MAX_PAGES - 1, numPaginas);
        pagesToShow = allPages.slice(startPage - 1, endPage);
      }
    
      for (let i = 1; i <= numPaginas; i++) {
        paginas.push(i);
      }

    
    return (
        <>
            <div>
                <h1>Historial de Ventas</h1>
            </div>
            <table className={styles.ventas_table}>
                <thead>
                    <tr>
                        <th>Fecha Venta</th>
                        <th>Nombre Producto</th>
                        <th>Stock</th>
                        <th>Valor unidad</th>
                        <th>Cantidad</th>
                        <th>Total Valor Venta</th>
                    </tr>
                </thead>
                <tbody>
                {aux.length ? (
                    aux.map((venta, index) => {
                        return(
                            <>
                            <tr key={index}>
                                <td>{venta.fecha}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                                {venta.Detalle_venta.map((detalle) => (
                                    <tr key={detalle.Producto.id_producto}>
                                        <td></td>
                                        <td>{detalle.Producto.nombre}</td>
                                        <td>{detalle.Producto.stock}</td>
                                        <td>${detalle.valor_unitario}</td>
                                        <td>{detalle.cantidad}</td>
                                        <td>${detalle.valor_total_cantidad}</td>
                                    </tr>
                                ))}
                            </>
                        )
                    })
                ) : (
                    <>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVVJREFUSEvFlYFNBDEMBPc7gUqASoBKgErgKwEqASoBjZSNnFzi3CNeRDr5/s/xeteOc9CZ1+HM8bUH4FoSz1Wxn5LeJH0Vy/t0ZQAXkp5L0CwGgDeSsJs1A3iU9FC82XgM2QIMI+xtsfZhX7NGADH4k6TNphABkLuQzMa/B2DDRwkA7VTfAASj1yLTfdzXA+CE8yzz7xI0Y45clwaPjlClqI1DJ2kGAHsSxFb2EcDaZ7pnAOSyiREByB4WaPgy6csVgGtB7WDRHDSKCz30G/a0pBWAm6TKHBn8BQBJN0lEAHdQ1p4rBm4UJEbqRqI9RV7NxrTI8bDUPj6hTXG1CrVRokRxuFWKJwC4C2sH9RLxO46KrF17qcye/5sajo68C4XzatjFwzX0HwH0E9IXzHsYYh7ZHtfTZP7twrHGZOrHVybfYGVGv74yVz2/6/ueS39XoJnTD8PBXRlXJ52JAAAAAElFTkSuQmCC"
                                    alt="imagen de advertencia"
                                    />
                                </td>
                                <td>No se ha realizado ninguna venta</td>
                                <td></td>
                                <td></td>
                            </tr>
                    </>
                )}
                </tbody>
            </table>
            {compras.length >= 7 && (
                <div>
                    <div className={styles.paginadoAbj}>
                        <div>
                            {numeroPagina > 1 && (
                                <button
                                    className={styles.prevPage}
                                    onClick={() => setNumeroPagina(numeroPagina - 1)}
                                >
                                    ◄
                                </button>
                            )}

                            {pagesToShow.map((pagina) => (
                                <button
                                    key={pagina}
                                    className={`btnPag ${
                                        pagina === numeroPagina ? styles.activePage : ""
                                    }`}
                                    onClick={() => setNumeroPagina(pagina)}
                                >
                                    {pagina}
                                </button>
                            ))}

                            {numeroPagina < numPaginas && (
                                <button
                                    className={styles.nextPage}
                                    onClick={() => setNumeroPagina(numeroPagina + 1)}
                                >
                                    ►
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};