import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import validations from "./validations";
import {  useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import s from "./FormRegister.module.css"

export default function FormRegister() {
  const [showPwd, setShowPwd] = useState(false)
  const dispatch = useDispatch();
  const BACK_HOST = 'https://henry-market-back-production.up.railway.app/'
  // const BACK_HOST = "http://localhost:3001/"

  useEffect(() => {
  }, [dispatch]);

  const [form, setForm] = useState({
    primer_nombre: "",
    primer_apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    passwordconfirm: "",
    estado: true,
    imagen: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Llama a la función validations con el estado del formulario actual
    const currentErrors = validations(form);
    // Actualiza el estado de los errores con los errores actuales
    setErrors(currentErrors);
  }, [form]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    const { primer_nombre,
      primer_apellido,
      direccion,
      telefono,
      email,
      password,
      passwordconfirm,
    } = form;

    // Realiza las validaciones
    const errors = validations({
      primer_nombre,
      primer_apellido,
      direccion,
      telefono,
      email,
      password,
      passwordconfirm,
    });


    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      try {

        await axios
          .post(`${BACK_HOST}usuario`, form)
          .then(res => {
            swal({
              title: 'Registro exitoso',
              text: 'Ya puedes navegar con tu cuenta!',
              icon: 'success',
              timer: '2000'
            })
            setShouldRedirect(true);
          })
          .catch(err => {
            swal({
              title: 'Error',
              text: 'intente nuevamente',
              icon: 'error',
              timer: '2000',
              button: 'Accept'
            })
          });

      } catch (error) {
        console.error("Error al encriptar la password:", error);
      }
    }
  };

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    // Verificar si el input es de tipo file
    if (event.target.type === "file") {
      const file = event.target.files[0]; // Obtener el archivo seleccionado
      let valor = 0;
      if (file) valor = 1
      console.log(valor);
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "im2gqbe4"); // Reemplazar con tu upload preset de Cloudinary
      formData.append("api_key", "341983536529681"); // Reemplazar con tu API Key de Cloudinary


      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcel6k4l6/image/upload",
          formData
        );

        // Obtener la URL de la imagen subida desde la respuesta de Cloudinary
        console.log(response.data.secure_url);
        const imageUrl = response.data.secure_url;


        // Actualizar el estado del formulario con la URL de la imagen subida
        setForm({
          ...form, // Copia el estado actual del formulario
          imagen: imageUrl // Actualiza la propiedad 'imagen' del estado con la URL de la imagen subida
        });
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        // Manejar el error aquí, por ejemplo mostrar un mensaje de error al usuario
      }
    } else {
      // Actualizar el estado del formulario para otros tipos de inputs
      setForm(prevForm => ({
        ...prevForm,
        [property]: value
      }));

      const currentErrors = validations({ [property]: value });
      // setErrors(prevErrors => ({
      //   ...prevErrors,
      //   [property]: currentErrors[property]
      // }))  
      setErrors({ ...errors, [property]: currentErrors[property] });


    }
  }

  

  return (
    <>

      {shouldRedirect ? (
        <Navigate to="/login" replace={true} />
      ) : (

        /* ----------------------- CONTENEDOR GENERAL -----------------------*/
        <div className={s.contenedor}>
          {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
          <div className={s.formcontainer} style={{ padding: '15px' }}>
            <CloudinaryContext cloudName="dcel6k4l6">
              <form onSubmit={handleSubmit} className={s.formcontainer}>
                {/* ----------------------- PRIMER NOMBRE -----------------------*/}
                <div className={s.nombres}>
                  <div className={s.contenedorDiv}>
                    <label  className={s.label}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="primer_nombre"
                      value={form.primer_nombre}
                      onChange={handleInputChange}
                      className={s.forminput}
                      placeholder='Nombre'
                    />

                    {/*errors.primer_nombre && (
                      // <div className={s.errors}>{errors.primer_nombre}</div>
                      <div className={s.ok}>✔</div>
                    )*/}
                    {errors.primer_nombre ? (
                      <div className={s.errors}>{errors.primer_nombre}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}

                  </div>

                
                </div>

                {/* ----------------------- PRIMER APELLIDO -----------------------*/}
                <div className={s.apellidos}>
                  <div className={s.contenedorDiv}>

                    <label  className={s.label}>
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="primer_apellido"
                      value={form.primer_apellido}
                      onChange={handleInputChange}
                      className={s.forminput}
                      placeholder='Apellido'
                    />
                    {errors.primer_apellido ? (
                      <div className={s.errors}>{errors.primer_apellido}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                  </div>

                  
                </div>


                {/* ----------------------- DIRECCION -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleInputChange}
                    className={s.forminput}
                      placeholder='Direccion'
                  />
                  {errors.direccion ? (
                      <div className={s.errors}>{errors.direccion}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                </div>

                {/* ----------------------- TELEFONO -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleInputChange}
                    className={s.forminput}
                      placeholder='Telefono'
                  />
                  {errors.telefono ? (
                      <div className={s.errors}>{errors.telefono}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                </div>

                {/* ----------------------- EMAIL -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className={s.forminput}
                      placeholder='Email'
                  />
                  {errors.email ? (
                      <div className={s.errors}>{errors.email}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                </div>

                {/* ----------------------- CONTRASEÑA -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Contraseña
                  </label>
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className={s.forminput}
                    placeholder='Contraseña'
                  />
                  <div className="position-absolute pointer pwd-icon" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>}
                  </div>
                    
                  {errors.password ? (
                      <div className={s.errors}>{errors.password}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                </div>
                
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Confirmar contraseña
                  </label>
                  <input
                    type={showPwd ? "text" : "password"}
                    name="passwordconfirm"
                    value={form.passwordconfirm}
                    onChange={handleInputChange}
                    className={s.forminput}
                    placeholder='Confirmar contraseña'
                  />
                  {errors.passwordconfirm ? (
                      <div className={s.errors}>{errors.passwordconfirm}</div>
                    ) : (
                      <div className={s.ok}>✔</div>
                    )}
                </div>

                {/* ----------------------- IMAGEN -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label htmlFor="" className={s.label}>
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleInputChange}
                    className={s.forminput}
                      placeholder=''
                  />

                  {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                  {form.imagen && (
                    <img
                      className={s.imageFile}
                      src={form.imagen}
                      id="imagen"
                      alt="foto perfil"
                    />
                  )}
                </div>

                <button className={s.button} type="submit">Registrase</button>
              </form>
            </CloudinaryContext>
          </div>
        </div>
      )}

    </>
  );
}
