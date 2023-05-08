
import { Link } from "react-router-dom"
import s from "./HomeAdmin.module.css"

function HomeAdmin() {
   return (
      <div className={s.container}>
         <h1>Admin Dashboard</h1>
         <h2 style={{ color: 'gray', fontWeight: '500' }}>Panel de administración de la plataforma</h2>
         <hr style={{ width: '40%', margin: '25px' }} />

         <div className={s.botones}>
            <h3>Selecciona qué deseas administrar</h3>
            <Link to="/products/admin">
               <button className={s.boton} style={{ width: '200px' }}>Administrar productos</button>
            </Link>
            <Link to="/admin/usuarios">
               <button className={s.boton} style={{ width: '200px' }}>Administrar Usuarios</button>
            </Link>
            <Link to="/producto">
               <button className={s.boton} style={{ width: '200px' }}>Crear Producto</button>
            </Link>
            <Link to="/historialVentas">
               <button className={s.boton}  style={{ width: '200px' }}>Historial de ventas</button>
            </Link>
            <Link to="/calificaciones">
               <button className={s.boton} style={{ width: '200px' }}>administrar calificaciones</button>
            </Link>
         </div>
      </div>

   )
}

export default HomeAdmin