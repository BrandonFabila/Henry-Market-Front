import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCalificaciones,deleteCalificacion } from '../../../store/actions';
import { FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import  styles from "./calificaciones.module.css"
import swal from 'sweetalert';

const Calificaciones = () => {
  const calificaciones = useSelector((state) => state.calificaciones) ?? [];
  console.log("calificaciones", calificaciones)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 20;
  const pageCount = Math.ceil(calificaciones.length / productsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  React.useEffect(() => {
    dispatch(getAllCalificaciones());
  }, [dispatch]);

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
    {Array.isArray(calificaciones) && calificaciones.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage).map((p) => {
  // rest of your code
        if (p.estado) {
          return (
            <>
              <tr key={p.id_motivo_calificacion}>
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
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                          dispatch(deleteCalificacion(p.id_motivo_calificacion))
                          .then(() => {
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
</div>

  );
};

export default Calificaciones;