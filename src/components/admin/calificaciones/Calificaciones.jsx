import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCalificaciones,deleteCalificacion } from '../../../store/actions';
import { FaTrash } from 'react-icons/fa';
import  styles from "./calificaciones.module.css"
import swal from 'sweetalert';

const Calificaciones = () => {
  const calificaciones = useSelector((state) => state.calificaciones) ?? [];
  const dispatch = useDispatch();
  const [numeroPagina, setNumeroPagina] = useState(1);

  useEffect(() => {
    dispatch(getAllCalificaciones());
  }, [dispatch]);

  const grupo = 20;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;
    
  const aux = calificaciones && calificaciones.slice
        ? calificaciones.slice(conteoInicial, conteoFinal)
        : [];

  const MAX_PAGES = 8;
  const paginas = [];
  const numPaginas = Math.ceil(calificaciones.length / grupo);

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
      <div className={styles.contenedor}>
        <table className={styles.miTabla} >
          <thead>
            <tr>
              <th>calificacion</th>
              <th>comentario</th>
              <th> eliminar</th>
            </tr>
          </thead>
          <tbody>
          {aux.length ? (
  aux
    .filter((p) => p.estado) 
    .map((p, index) => {
      return (
        <>
          <tr key={index}>
            <td>{p.valor_calificacion}</td>
            <td>{p.descripcion_motivo}</td>
            <td>
              <FaTrash
                size={22}
                color="var(--green-color)"
                className={styles.delete}
                onClick={() =>
                  swal({
                    title: "¿Estás seguro de que quieres eliminar este comentario?",
                    text: "Una vez eliminado, no podrás recuperarlo",
                    icon: "warning",
                    buttons: ["Cancelar", "Eliminar"],
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      dispatch(deleteCalificacion(p.id_motivo_calificacion)).then(() => {
                        swal("El comentario ha sido eliminado.", {
                          icon: "success",
                        }).then(() => {
                          window.location.reload();
                        });
                      });
                    } else {
                      swal("El comentario no ha sido eliminado.");
                    }
                  })
                }
              />
            </td>
          </tr>
        </>
      );
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
                <td>No hay productos con Calificaciones</td>
                <td></td>
                <td></td>
            </tr>
            </>
          )}
          </tbody>
        </table>
        {calificaciones.length >= 7 && (
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
      </div>
  );
};

export default Calificaciones;