import React from 'react'
import Cookies from "js-cookie";
import Calificaciones from '../calificaciones/Calificaciones';
import style from "./ListaCalf.module.css"

function ListaCalf() {
  const session = Cookies.get("user_session");

  return (
    <>
      {session ?
        <div className={style.container}>
          <div className={style.ventas}>
            <Calificaciones />
          </div>
        </div> : <p> No hay nada pa </p>
      }
    </>
  )
}

export default ListaCalf