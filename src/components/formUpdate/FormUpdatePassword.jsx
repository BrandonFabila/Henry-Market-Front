import { useState, useEffect } from "react";
import axios from "axios";
import validations from "./validationsPassword";
// import bcrypt from "bcryptjs";
import swal from "sweetalert";
import style from "./UpPassword.module.css";
import { useNavigate } from 'react-router-dom';

export default function FormUpdatePassword(props) {

  // const api_host= "http://localhost:3001/";
const api_host = 'https://henry-market-back-production.up.railway.app/'

  const [showPwd, setShowPwd] = useState(false)

  const { idUsuario } = props; 
  // const usuarioId = idUsuario;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // const estaLogueado = window.localStorage.getItem("estaLogueado");

  const handleSubmit = async event => {
    event.preventDefault();
    window.localStorage.removeItem("estaLogueado");
    window.localStorage.removeItem('carrito');
    window.localStorage.removeItem('count');
    // Obtiene los valores del formulario
    const {
      // id_usuario,
      password,
      confirmPassword,
    } = form;

    const data = {
      id_usuario: form.id_usuario,
      password: form.password,
    }

    console.log(data);

    // Realiza las validaciones
    const errors = validations({
      password,
      confirmPassword
    });
    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      try {
        // const salt = bcrypt.genSaltSync(10);
        const hashedPassword = data.password;
        setForm({ ...form, password: hashedPassword });
        await axios
          .put(`${api_host}usuario`, { ...data }) // Actualiza el valor de 'password' en el objeto de datos enviado
          .then(res =>
            swal({
              title: "Cambio exitoso",
              text: "Debes loguearte nuevamente!",
              icon: "success",
              timer: "2000"

            })
          )
          .catch(err =>
            swal({
              text: "intente nuevamente",
              icon: "error",
              timer: "2000",
              button: "Accept"
            })
          );

        setShouldRedirect(true);
      } catch (error) {
        console.error("Error al encriptar la password:", error);
      }
      // ...

    }
  };
  const [form, setForm] = useState({
    id_usuario: null,
    password: "",
    confirmPassword: ""
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [showForm, setShowForm] = useState(true);

  const handleCerrar = () => {
    setShowForm(false);
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      id_usuario: idUsuario
    }));
  }, [idUsuario]);

  // useEffect(() => {
  //   setMostrar(mostrarProp)
  // })


  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    setForm(prevForm => ({
      ...prevForm,
      [property]: value
    }));
    // Validar el campo actual y actualizar el estado de errores
    const currentErrors = validations({ [property]: value });
    setErrors(prevErrors => ({
      ...prevErrors,
      [property]: currentErrors[property]
    }))
  };


  return (

    <>

      {shouldRedirect ? (
         navigate('/login')
      ) : (
        <>
        {showForm ? (
          <div className={ style.container }>
            <button className={style.cerrar} onClick={handleCerrar}>X</button>
            <form onSubmit={handleSubmit} className={style.contenedor} >
              <label className={style.label} >Nueva Contraseña:</label>

              <input
                type={showPwd ? "password" : "text"}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className={style.input}
              />
              {errors.password && (
                <div className={style.errors}>{errors.password}</div>
              )}

              <label className={style.label} >Confirmar Contraseña:</label>

              <input
                type={showPwd ? "password" : "text"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInputChange}
                className={style.input}
              />
              {errors.confirmPassword && (
                <div className={style.errors}>{errors.confirmPassword}</div>
              )}

              <div className={style.icon} >
                <div className="position-absolute pointer pwd-icon " onClick={() => setShowPwd(!showPwd)}>
                        {!showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                        </svg>}
                </div>
              </div>
              <br></br>
              <button  className={style.actualizar} type="submit" disabled={form.password && form.confirmPassword ? false : true} >Actualizar</button>
            </form>
          </div>
        ) : null}
        </>
        )}
    </>
  )

}