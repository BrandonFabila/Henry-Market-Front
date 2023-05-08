import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../store/actions';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styles from './Products.module.css';

const Products = () => {
  const products = useSelector((state) => state.products) ?? [];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const productsPerPage = 20;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <> Buscar producto: 
      <input
      className={styles.busqueda}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos por nombre"
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th style={{ padding: '0.5rem' }}> Stock </th>
            <th>Editar o eliminar</th>
          </tr>
        </thead>
        <tbody>
        {products
          .filter((p) => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
          .map((p) => {
            if (p.estado) {
              return (
                <>
                  <tr key={p.id_producto}>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion_producto}</td>
                    <td>{p.stock}</td>
                    <td>
                      <Link to={`/product/${p.id_producto}`}>
                        <FiEdit size={22} color="var(--green-color)" className={styles.edit} style={{ margin: '5px 0px' }} />
                      </Link>
                    </td>
                  </tr>
                  <hr style={{ width: '520%' }} />
                </>
              );
            } else {
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

export default Products;