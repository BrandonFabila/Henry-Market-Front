import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../store/actions";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";

const Products = () => {
  const products = useSelector((state) => state.products) ?? [];
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDisabledProducts, setShowDisabledProducts] = useState(false);
  const [numeroPaginaHabilitados, setNumeroPaginaHabilitados] = useState(1);
  const [numeroPaginaInactivos, setNumeroPaginaInactivos] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts());
    setNumeroPaginaHabilitados(1);
    setNumeroPaginaInactivos(1);
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      setNumeroPaginaHabilitados(1);
      setNumeroPaginaInactivos(1);
    }
  }, [searchTerm]);

  const grupo = 20; // Número de productos por página
  const conteoFinalHabilitados = numeroPaginaHabilitados * grupo;
  const conteoInicialHabilitados = conteoFinalHabilitados - grupo;
  const conteoFinalInactivos = numeroPaginaInactivos * grupo;
  const conteoInicialInactivos = conteoFinalInactivos - grupo;

  const productsHabilitados = products.filter((p) => p.estado);
  const productsInactivos = products.filter((p) => !p.estado);
  const numPaginasHabilitados = Math.ceil(productsHabilitados.length / grupo);
  const numPaginasInactivos = Math.ceil(productsInactivos.length / grupo);

  const MAX_PAGES = 10;
  const paginasHabilitados = [];
  const paginasInactivos = [];

  if (numPaginasHabilitados > MAX_PAGES) {
    let startPage = Math.max(
      1,
      numeroPaginaHabilitados - Math.floor(MAX_PAGES / 2)
    );
    let endPage = Math.min(numPaginasHabilitados, startPage + MAX_PAGES - 1);
    for (let i = startPage; i <= endPage; i++) {
      paginasHabilitados.push(i);
    }
  } else {
    for (let i = 1; i <= numPaginasHabilitados; i++) {
      paginasHabilitados.push(i);
    }
  }

  if (numPaginasInactivos > MAX_PAGES) {
    let startPage = Math.max(
      1,
      numeroPaginaInactivos - Math.floor(MAX_PAGES / 2)
    );
    let endPage = Math.min(numPaginasInactivos, startPage + MAX_PAGES - 1);
    for (let i = startPage; i <= endPage; i++) {
      paginasInactivos.push(i);
    }
  } else {
    for (let i = 1; i <= numPaginasInactivos; i++) {
      paginasInactivos.push(i);
    }
  }

  const handlePaginaAnteriorHabilitados = () => {
    if (numeroPaginaHabilitados > 1) {
      setNumeroPaginaHabilitados(numeroPaginaHabilitados - 1);
    }
  };

  const handlePaginaSiguienteHabilitados = () => {
    if (numeroPaginaHabilitados < numPaginasHabilitados) {
      setNumeroPaginaHabilitados(numeroPaginaHabilitados + 1);
    }
  };

  const handlePaginaAnteriorInactivos = () => {
    if (numeroPaginaInactivos > 1) {
      setNumeroPaginaInactivos(numeroPaginaInactivos - 1);
    }
  };

  const handlePaginaSiguienteInactivos = () => {
    if (numeroPaginaInactivos < numPaginasInactivos) {
      setNumeroPaginaInactivos(numeroPaginaInactivos + 1);
    }
  };

  const handleEnabledProductsClick = () => {
    setShowDisabledProducts(false);
    setNumeroPaginaHabilitados(1);
  };

  const handleDisabledProductsClick = () => {
    setShowDisabledProducts(true);
    setNumeroPaginaInactivos(1);
  };

  const productosPaginados = showDisabledProducts
    ? productsInactivos.slice(conteoInicialInactivos, conteoFinalInactivos)
    : productsHabilitados.slice(
        conteoInicialHabilitados,
        conteoFinalHabilitados
      );

  const productosFiltrados = productosPaginados.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const numPaginas = showDisabledProducts
    ? numPaginasInactivos
    : numPaginasHabilitados;
  const numeroPagina = showDisabledProducts
    ? numeroPaginaInactivos
    : numeroPaginaHabilitados;

  const handleCambiarPagina = (pagina) => {
    if (showDisabledProducts) {
      setNumeroPaginaInactivos(pagina);
    } else {
      setNumeroPaginaHabilitados(pagina);
    }
  };

  const handlePaginaAnterior = showDisabledProducts
    ? handlePaginaAnteriorInactivos
    : handlePaginaAnteriorHabilitados;
  const handlePaginaSiguiente = showDisabledProducts
    ? handlePaginaSiguienteInactivos
    : handlePaginaSiguienteHabilitados;
  const paginas = showDisabledProducts ? paginasInactivos : paginasHabilitados;


return (
    <>
      <div>
        <h2>Buscar producto:</h2>
        <input
          className={styles.busqueda}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos por nombre"
        />
      </div>
      <div className={styles.butcon}>
        <button
          className={`${styles.mostrar} ${
            !showDisabledProducts ? styles.activo : ""
          }`}
          onClick={handleEnabledProductsClick}
        >
          Productos habilitados
        </button>
        <button
          className={`${styles.mostrar} ${
            showDisabledProducts ? styles.activo : ""
          }`}
          onClick={handleDisabledProductsClick}
        >
          Productos inactivos
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thN}>Nombre</th>
              <th className={styles.thD}>Descripción</th>
              <th className={styles.thS} style={{ padding: "0.5rem" }}>
                Stock
              </th>
              <th className={styles.thS}>
                {showDisabledProducts ? "Restaurar" : "Editar o eliminar"}
              </th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <React.Fragment key={p.id_producto}>
                <tr>
                  <td className={styles.textoN}>{p.nombre}</td>
                  <td className={styles.textoD}>
                    {p.descripcion_producto.slice(0, 37)}...
                  </td>
                  <td className={styles.textoStock}>{p.stock}</td>
                  <td>
                    <Link to={`/product/${p.id_producto}`}>
                      <FiEdit
                        size={22}
                        color="var(--green-color)"
                        className={styles.edit}
                        style={{ margin: "5px 0px" }}
                      />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className={styles.separator} colSpan="4"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginadoAbj}>
        <button
          className={styles.paginaAnterior}
          onClick={handlePaginaAnterior}
          disabled={numeroPagina === 1}
        >
          ◄
        </button>
        {paginas.map((pagina) => (
          <button
            key={pagina}
            className={`${styles.pagina} ${
              pagina === numeroPagina ? styles.activePage : ""
            }`}
            onClick={() => handleCambiarPagina(pagina)}
          >
            {pagina}
          </button>
        ))}

        <button
          className={styles.paginaSiguiente}
          onClick={handlePaginaSiguiente}
          disabled={numeroPagina === numPaginas}
        >
          ►
        </button>
      </div>
    </>
  );
};

export default Products;
