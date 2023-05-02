import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import validations from "./validations";
import {  useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"

import s from "./FormRegister.module.css"

export default function FormRegister() {
  const dispatch = useDispatch();
  // const BACK_HOST = 'https://henry-market-back-production.up.railway.app/'
  const BACK_HOST = "http://localhost:3001/"

  useEffect(() => {
  }, [dispatch]);

  const [form, setForm] = useState({
    primer_nombre: "",
    primer_apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
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
    } = form;

    // Realiza las validaciones
    const errors = validations({
      primer_nombre,
      primer_apellido,
      direccion,
      telefono,
      email,
      password,
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
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className={s.forminput}
                    placeholder='Contraseña'
                  />
                  {errors.password ? (
                      <div className={s.errors}>{errors.password}</div>
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
