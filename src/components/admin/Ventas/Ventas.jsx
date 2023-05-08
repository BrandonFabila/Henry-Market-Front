import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopping } from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import styles from './Ventas.module.css';

export default function Ventas(){
    const compras = useSelector(state => state.compras) ?? [];
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);

    const ventasPerPage = 10;
    const pageCount = Math.ceil(compras.length / ventasPerPage);
  
    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };

    useEffect(() => {
        dispatch(getShopping());
    }, [dispatch]);
    
    return (
        <>
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
                {Array.isArray(compras) && compras.slice(currentPage * ventasPerPage, (currentPage + 1) * ventasPerPage).map((venta) => {

                        if(venta.id_venta){
                            return(
                                <>
                                <tr key={venta.id_venta}>
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
                            );
                        }else{
                            return null;
                        }
                    })}
                </tbody>
            </table>
            <ReactPaginate
                className={styles.reactpaginate } 
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
};