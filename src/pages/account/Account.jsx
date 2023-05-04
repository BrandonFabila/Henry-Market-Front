import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsuarioByEmail } from "../../store/actions/index";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import FormUpdate from "../../components/formUpdate/FormUpdate"
import FormUpdatePassword from "../../components/formUpdate/FormUpdatePassword"
import s from "./Account.module.css";

const Account = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;

  const usuario = useSelector(state => state.usuario);
  const usuarioMemo = useMemo(() => usuario ?? [], [usuario]);

  useEffect(() => {
    dispatch(getUsuarioByEmail(email));
  }, [dispatch, email]);

  useEffect(() => {
    if (usuarioMemo.length > 0) {
      setUserData(usuarioMemo[0]);
    }
  }, [usuarioMemo.length, usuarioMemo]);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogInClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const idUsuario = usuario.length > 0 ? usuario[0].id_usuario : null;

  const nombreUsuario = userData.primer_nombre + ' '  + userData.primer_apellido 

  return (
    <div className={s.container}>

      <div className={s.usuario}>
        <div className={s.datos} >
          <h2 style={{textAlign: 'center', fontSize: '30px', marginBottom: '-10px' }}>{nombreUsuario}</h2>
          <h3 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '20px' }}>{userData.email}</h3>
        </div>

        <div className={s.datos}>
          <div>
            <div style={{ backgroundImage: `url(${userData.imagen})` }} className={s.imagen}></div>
          </div>
        </div>

        <FormUpdate userData={userData}  idUsuario={idUsuario} />

        <div className={s.update}>
          <button className={s.contraseña} onClick={handleLogInClick}>Cambiar contraseña</button>
          {showProfileMenu && <FormUpdatePassword idUsuario={idUsuario} mostrarProp={true} />}
        </div>

      </div>
      
    </div>
  );
};



export default Account;