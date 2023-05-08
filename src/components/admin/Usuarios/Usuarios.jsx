import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../store/actions/index";
import { useEffect } from "react";
import s from "./Usuarios.module.css";
import axios from "axios";
import swal from 'sweetalert';

function Usuarios() {
  const api_host= "http://localhost:3001/";
  // const api_host = 'https://henry-market-back-production.up.railway.app/'

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function showConfirmationDialog(message) {
    return swal({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      buttons: ['Cancelar', 'Sí'],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        window.location.reload();
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
  }
  

  function buscarId(id_usuario) {
    const id = allUsers.find((c) => c.id_usuario === id_usuario);
    showConfirmationDialog(`¿Desea banear al usuario ${id.primer_nombre} ${id.primer_apellido}?`)
      .then(() => handleBorrar(id.id_usuario))
      .catch(() => console.log('Acción cancelada.'));
  }

  const handleBorrar = async (id_usuario) => {
    try {
      let a = await axios.put(`${api_host}usuario/delete`, {
        id_usuario: id_usuario,
        estado: false,
      });
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  };

  function buscarId2(id_usuario) {
    const id = allUsers.find((c) => c.id_usuario === id_usuario);
    showConfirmationDialog(`¿Desea restaurar al usuario ${id.primer_nombre} ${id.primer_apellido}?`)
      .then(() => handledesBorrar(id.id_usuario))
      .catch(() => console.log('Acción cancelada.'));
  }

  const handledesBorrar = async (id_usuario) => {
    try {
      let a = await axios.put(`${api_host}usuario/delete`, {
        id_usuario: id_usuario,
        estado: true,
      });
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      {allUsers.some((p) => p.estado === true) ? (
        <>
          <h2 style={{ color: "var(--green-color)", margin: "15px" }}>
            Listado de usuarios
          </h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Banear</th>
              </tr>
            </thead>
            <tbody>
            {allUsers.filter((p) => p.estado).map((p) => (
              <tr key={p.id_usuario}>
                <td>{p.primer_nombre}</td>
                <td>{p.primer_apellido}</td>
                <td>{p.email}</td>
                <td>
                  <button
                  className={s.boton1}
                    onClick={() => {
                      buscarId(p.id_usuario);
                    }}
                  >
                    Banear
                  </button>
                </td>
              </tr>
            ))}

            </tbody>
          </table>
          <div className={s.separador}></div>
        </>
      ) : null}
      {allUsers.some((p) => p.estado === false) ? (
        <>

          <h2 style={{ color: "var(--green-color)", margin: "15px" }}>
            Listado de usuarios baneados
          </h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Desbanear</th>
              </tr>
            </thead>
            <tbody>
            {allUsers.map((p) => {
                    if (!p.estado) {
                      return (
                        <tr key={p.id_usuario} className={s.eliminados}>
                          <td>{p.primer_nombre}</td>
                          <td>{p.primer_apellido}</td>
                          <td>{p.email}</td>
                          <td>
                            <button
                              className={s.boton2}
                              onClick={() => {
                                buscarId2(p.id_usuario);
                              }}
                            >
                              Restaurar
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}

export default Usuarios;