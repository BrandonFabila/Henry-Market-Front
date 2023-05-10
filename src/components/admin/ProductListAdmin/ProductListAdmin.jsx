import React from 'react'
import Products from '../productsAdmin/Products'
import style from "./ProductListAdmin.module.css"
import Cookies from "js-cookie";


function ProductListAdmin() {
  const session = Cookies.get("user_session");

  return (
    <>
      {session ?
        <div className={style.container}>
          <div className={style.ventas}>
            <Products />
          </div>
        </div> : <p> No hay nada para mostrar </p>
      }
    </>
  )
}

export default ProductListAdmin