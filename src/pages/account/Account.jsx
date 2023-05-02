import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsuarioByEmail } from "../../store/actions/index";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import FormUpdate from "../../components/formUpdate/FormUpdate"
import FormUpdatePassword from "../../components/formUpdate/FormUpdatePassword"
import s from "./Account.module.css";

const Account = () => {
  /* ------------------- ESTADOS ------------------- */
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario) ?? [];

  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;

  useEffect(() => {
    dispatch(getUsuarioByEmail(email));
  }, [dispatch, email]);

  // Actualizar el estado local con los datos del usuario
  useEffect(() => {
    if (usuario.length > 0) {
      setUserData(usuario[0]);
    }
  }, [usuario]);

  /* ------------- MENU HAMBURGUESA ------------- */

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogInClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const idUsuario = usuario.length > 0 ? usuario[0].id_usuario : null;

  const nombreUsuario = userData.primer_nombre + ' '  + userData.primer_apellido 

  return (
    <div className={s.container}>

      <div className={s.usuario}>
        <h2 style={{ marginBottom: '15px', textAlign: 'left', fontSize: '30px' }}>Mi cuenta</h2>
        <div className={s.datos}>
          <div style={{ backgroundImage: `url(${userData.imagen})` }} className={s.imagen}></div>
          
          <span className={s.label}>Nombre</span>
          <h3 className={s.dato_nombre}>{nombreUsuario}</h3>

          <span className={s.label}>Email</span>
          <h3 className={s.dato}>{userData.email}</h3>


          <span className={s.label}>Dirección</span>
          <h3 className={s.dato}>{userData.direccion}</h3>

          <span className={s.label}>Teléfono</span>
          <h3 className={s.dato}>{userData.telefono}</h3>
        </div>

      </div>

      <div className={s.update}>
        <FormUpdate idUsuario={idUsuario} />
        <button onClick={handleLogInClick}>Quiero cambiar mi contraseña</button>
        {showProfileMenu && <FormUpdatePassword idUsuario={idUsuario} mostrarProp={true} />}
      </div>
    </div>
  );
};



export default Account;