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
  const [showDisabledProducts, setShowDisabledProducts] = useState(false);

  const productsPerPage = 20;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterClick = () => {
    setShowDisabledProducts(!showDisabledProducts);
  };

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      Buscar producto: 
      <input
        className={styles.busqueda}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos por nombre"
      />
      <div>
        <button
          className={styles.mostrar}
          onClick={handleFilterClick}
          style={{ backgroundColor: showDisabledProducts ? 'var(--red-color)' : 'var(--green-color)' }}
        >
          {showDisabledProducts ? 'Mostrando solo deshabilitados' : 'Mostrando solo habilitados'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th style={{ padding: '0.5rem' }}> Stock </th>
            <th>{showDisabledProducts ? 'Restaurar' : 'Editar o eliminar'}</th>
          </tr>
        </thead>
        <tbody>
        {products
  .filter((p) => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((p) => showDisabledProducts ? !p.estado : p.estado)
  .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
  .map((p) => {
    return (
      <>
        <tr key={p.id_producto}>
          <td>{p.nombre}</td>
          <td>{p.descripcion_producto}</td>
          <td>{p.stock}</td>
          <td>
            {showDisabledProducts }
              <Link to={`/product/${p.id_producto}`}>
                <FiEdit size={22} color="var(--green-color)" className={styles.edit} style={{ margin: '5px 0px' }} />
              </Link>           
          </td>
        </tr>
        <hr style={{ width: '520%' }} />
      </>
    );
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
