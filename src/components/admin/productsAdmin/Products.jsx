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
    dispatch(getAllProducts()); // Se envía una acción para obtener todos los productos
    setNumeroPaginaHabilitados(1); // Se establece la página inicial de productos habilitados en 1
    setNumeroPaginaInactivos(1); // Se establece la página inicial de productos inactivos en 1
  }, [dispatch]);

  const grupo = 20; // Número de productos por página
  const conteoFinalHabilitados = numeroPaginaHabilitados * grupo; // Índice final de productos habilitados en la página actual
  const conteoInicialHabilitados = conteoFinalHabilitados - grupo; // Índice inicial de productos habilitados en la página actual
  const conteoFinalInactivos = numeroPaginaInactivos * grupo; // Índice final de productos inactivos en la página actual
  const conteoInicialInactivos = conteoFinalInactivos - grupo; // Índice inicial de productos inactivos en la página actual

  let productsHabilitados = !searchTerm
    ? products.filter((p) => p.estado) // Filtra los productos que están habilitados
    : products.filter(
        (p) =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && p.estado
      );
  let productsInactivos = !searchTerm
    ? products.filter((p) => !p.estado) // Filtra los productos que están inactivos
    : products.filter(
        (p) =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && !p.estado
      );
  const numPaginasHabilitados = Math.ceil(productsHabilitados.length / grupo); // Calcula el número total de páginas para los productos habilitados
  const numPaginasInactivos = Math.ceil(productsInactivos.length / grupo); // Calcula el número total de páginas para los productos inactivos

  const MAX_PAGES = 10; // Número máximo de páginas mostradas en la paginación
  const paginasHabilitados = []; // Almacena las páginas disponibles para los productos habilitados
  const paginasInactivos = []; // Almacena las páginas disponibles para los productos inactivos

  if (numPaginasHabilitados > MAX_PAGES) {
    // Si el número de páginas para los productos habilitados supera el límite máximo de páginas a mostrar
    let startPage = Math.max(
      1,
      numeroPaginaHabilitados - Math.floor(MAX_PAGES / 2)
    ); // Calcula la página inicial en función de la página actual y el número máximo de páginas a mostrar
    let endPage = Math.min(numPaginasHabilitados, startPage + MAX_PAGES - 1); // Calcula la página final en función de la página inicial y el número máximo de páginas a mostrar
    for (let i = startPage; i <= endPage; i++) {
      paginasHabilitados.push(i); // Agrega las páginas al array de páginas para los productos habilitados
    }
  } else {
    for (let i = 1; i <= numPaginasHabilitados; i++) {
      paginasHabilitados.push(i); // Agrega todas las páginas al array de páginas para los productos habilitados
    }
  }

  if (numPaginasInactivos > MAX_PAGES) {
    // Si el número de páginas para los productos inactivos supera el límite máximo de páginas a mostrar
    let startPage = Math.max(
      1,
      numeroPaginaInactivos - Math.floor(MAX_PAGES / 2)
    ); // Calcula la página inicial en función de la página actual y el número máximo de páginas a mostrar
    let endPage = Math.min(numPaginasInactivos, startPage + MAX_PAGES - 1); // Calcula la página final en función de la página inicial y el número máximo de páginas a mostrar
    for (let i = startPage; i <= endPage; i++) {
      paginasInactivos.push(i); // Agrega las páginas al array de páginas para los productos inactivos
    }
  } else {
    for (let i = 1; i <= numPaginasInactivos; i++) {
      paginasInactivos.push(i); // Agrega todas las páginas al array de páginas para los productos inactivos
    }
  }

  const handlePaginaAnteriorHabilitados = () => {
    // Maneja el evento de hacer clic en el botón de página anterior para los productos habilitados
    if (numeroPaginaHabilitados > 1) {
      setNumeroPaginaHabilitados(numeroPaginaHabilitados - 1); // Actualiza el número de página de los productos habilitados restando 1
    }
  };

  const handlePaginaSiguienteHabilitados = () => {
    // Maneja el evento de hacer clic en el botón de página siguiente para los productos habilitados
    if (numeroPaginaHabilitados < numPaginasHabilitados) {
      setNumeroPaginaHabilitados(numeroPaginaHabilitados + 1); // Actualiza el número de página de los productos habilitados sumando 1
    }
  };

  const handlePaginaAnteriorInactivos = () => {
    // Maneja el evento de hacer clic en el botón de página anterior para los productos inactivos
    if (numeroPaginaInactivos > 1) {
      setNumeroPaginaInactivos(numeroPaginaInactivos - 1); // Actualiza el número de página de los productos inactivos restando 1
    }
  };

  const handlePaginaSiguienteInactivos = () => {
    // Maneja el evento de hacer clic en el botón de página siguiente para los productos inactivos
    if (numeroPaginaInactivos < numPaginasInactivos) {
      setNumeroPaginaInactivos(numeroPaginaInactivos + 1); // Actualiza el número de página de los productos inactivos sumando 1
    }
  };

  const handleEnabledProductsClick = () => {
    // Maneja el evento de hacer clic en el botón de productos habilitados
    setShowDisabledProducts(false); // Establece la bandera de mostrar productos inactivos en falso
    setNumeroPaginaHabilitados(1); // Reinicia el número de página de los productos habilitados a 1
  };

  const handleDisabledProductsClick = () => {
    // Maneja el evento de hacer clic en el botón de productos inactivos
    setShowDisabledProducts(true); // Establece la bandera de mostrar productos inactivos en verdadero
    setNumeroPaginaInactivos(1); //Reinicia el número de página de los productos deshabilitados a 1
  };

  const productosPaginados = showDisabledProducts
    ? productsInactivos.slice(conteoInicialInactivos, conteoFinalInactivos)
    : productsHabilitados.slice(
        conteoInicialHabilitados,
        conteoFinalHabilitados
      );
  // Si showDisabledProducts es verdadero, se selecciona un subconjunto de productos inactivos basado en los índices de conteoInicialInactivos y conteoFinalInactivos.
  // De lo contrario, se selecciona un subconjunto de productos habilitados basado en los índices de conteoInicialHabilitados y conteoFinalHabilitados.

  let productosFiltrados = productosPaginados;
  /*
  const productosFiltrados = productosPaginados.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );*/
  // Se filtran los productos paginados en función del término de búsqueda (searchTerm).
  // Solo se incluirán los productos cuyo nombre contenga el término de búsqueda (ignorando mayúsculas y minúsculas).
  if (searchTerm) {
    productosFiltrados = productosPaginados.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const numPaginas = showDisabledProducts
    ? numPaginasInactivos
    : numPaginasHabilitados;
  // Si showDisabledProducts es verdadero, el número de páginas será el número de páginas para los productos inactivos (numPaginasInactivos).
  // De lo contrario, el número de páginas será el número de páginas para los productos habilitados (numPaginasHabilitados).

  const numeroPagina = showDisabledProducts
    ? numeroPaginaInactivos
    : numeroPaginaHabilitados;
  // Si showDisabledProducts es verdadero, el número de página será el número de página actual para los productos inactivos (numeroPaginaInactivos).
  // De lo contrario, el número de página será el número de página actual para los productos habilitados (numeroPaginaHabilitados).

  const handleCambiarPagina = (pagina) => {
    if (showDisabledProducts) {
      setNumeroPaginaInactivos(pagina);
    } else {
      setNumeroPaginaHabilitados(pagina);
    }
  };
  // Maneja el evento de cambiar de página. Dependiendo del valor de showDisabledProducts, actualiza el número de página para los productos inactivos o habilitados.

  const handlePaginaAnterior = showDisabledProducts
    ? handlePaginaAnteriorInactivos
    : handlePaginaAnteriorHabilitados;
  // Si showDisabledProducts es verdadero, handlePaginaAnterior se refiere a la función handlePaginaAnteriorInactivos.
  // De lo contrario, handlePaginaAnterior se refiere a la función handlePaginaAnteriorHabilitados.

  const handlePaginaSiguiente = showDisabledProducts
    ? handlePaginaSiguienteInactivos
    : handlePaginaSiguienteHabilitados;
  // Si showDisabledProducts es verdadero, handlePaginaSiguiente se refiere a la función handlePaginaSiguienteInactivos.
  // De lo contrario, handlePaginaSiguiente se refiere a la función handlePaginaSiguienteHabilitados.

  const paginas = showDisabledProducts ? paginasInactivos : paginasHabilitados;
  // Si showDisabledProducts es verdadero, se utiliza el array de páginas para los productos inactivos (paginasInactivos).
  // De lo contrario, se utiliza el array de páginas para los productos habilitados (paginasHabilitados).

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
      {products === [] ? (
        <div>
          <h1 style={{ fontSize: "40px", marginTop: "25px" }}>Cargando...</h1>
        </div>
      ) : (
        <div>
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
                {productosFiltrados.length === 0 && searchTerm ? (
                  <tr>
                    <td className={styles.textoN}>No hay coincidencias</td>
                  </tr>
                ) : (
                  productosFiltrados.map((p) => (
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
                  ))
                )}
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
        </div>
      )}
    </>
  );
};

export default Products;
