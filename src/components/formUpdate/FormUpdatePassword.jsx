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

  const { mostrarProp } = props
  const [mostrar, setMostrar] = useState(mostrarProp)
  const handleMostrar = () => {
    setMostrar(!mostrar)
  }

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
        <div className={ style.container }>
          <button className={style.cerrar} onClick={handleMostrar}>Cancelar</button>
          <form onSubmit={handleSubmit}>
            <label>Nueva Contraseña:</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className='form-input'
            />
            {errors.password && (
              <div className={style.errors}>{errors.password}</div>
            )}

            <label>Confirmar Contraseña:</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className='form-input'
            />
            {errors.confirmPassword && (
              <div className={style.errors}>{errors.confirmPassword}</div>
            )}
            <br></br>
            <button type="submit">Actualizar</button>
          </form>
        </div>

      )}

    </>
  )

}