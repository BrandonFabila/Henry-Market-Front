import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert";
import validations from "./validations";
import style from "./FormUpdate.module.css";

export default function FormUpdate({ idUsuario, userData }) {
  // const api_host = 'https://henry-market-back-production.up.railway.app/'
  const api_host = "http://localhost:3001/"

  const [form, setForm] = useState({
    id_usuario: null,
    direccion: "",
    telefono: "",
    imagen: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentErrors = validations(form);
    setErrors(currentErrors);
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // captura de datos del estado form
    const data = {
      id_usuario: form.id_usuario,
      direccion: form.direccion,
      telefono: form.telefono,
      estado: form.estado,
      imagen: form.imagen
    };

    const { 
      direccion,
      telefono,
      password,
    } = form;

    const errors = validations({
      direccion,
      telefono,
      password,
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Remover propiedades con valores falsy (vacíos) del objeto data
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => !!value)
      );

      await axios
        .put(`${api_host}usuario`, filteredData)
        .then(res => swal({
          title: 'Actualización Exitosa',
          text: 'Ya puedes ver tus cambios reflejados',
          icon: 'success',
          timer: '2000'
        }))

      //dispatch(getUserById(usuarioId))
      window.location.reload() // Actualiza la página     
        .catch(err => swal({
          text: 'intente nuevamente',
          icon: 'error',
          timer: '2000',
          button: 'Accept'
        }));

    }
  };

  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    if (event.target.type === "file") {
      const file = event.target.files[0]; 
      let valor = 0;
      if (file) valor = 1;
      console.log(valor);
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "im2gqbe4"); // Reemplazar con tu upload preset de Cloudinary
      formData.append("api_key", "341983536529681"); // Reemplazar con tu API Key de Cloudinary
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfmkjxjsf/image/upload",
          formData
        );

        // Obtener la URL de la imagen subida desde la respuesta de Cloudinary
        const imageUrl = response.data.secure_url;

        // Actualizar el estado del formulario con la URL de la imagen subida
        setForm(prevForm => ({
          ...prevForm, // Copia el estado actual del formulario
          imagen: imageUrl // Actualiza la propiedad 'imagen' del estado con la URL de la imagen subida
        }));
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
      setErrors({ ...errors, [property]: currentErrors[property] });
    }
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      id_usuario: idUsuario
    }));
  }, [idUsuario]);

  return (
    <div className={style.contenedor}>
      <div className={style.formcontainer}>
        <CloudinaryContext cloudName="dfmkjxjsf">
          <form onSubmit={handleSubmit}>
            <label  style={{ fontWeight: '600' }}>
              Actualizar datos
            </label>
            {/* ----------------------- DIRECCION -----------------------*/}
            <div className={style.contenedorDiv}>
              <label  className={style.label}>
                Dirección
              </label>
              <input
                placeholder={userData.direccion}
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleInputChange}
                className={style.inputs}
                style={{ fontSize: '15px', margin: '5px' }}
              />
              {errors.direccion && (
                <div className={style.errors}>{errors.direccion}</div>
              )}
            </div>
            {/* ----------------------- TELEFONO -----------------------*/}
            <div className={style.contenedorDiv}>
              <label  className={style.label}>
                Teléfono
              </label>
              <input
                placeholder={userData.telefono}
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleInputChange}
                className={style.inputs}
                style={{ fontSize: '15px', margin: '5px' }}
              />
              {errors.telefono && (
                <div className={style.errors}>{errors.telefono}</div>
              )}
            </div>
            {/* ----------------------- IMAGEN -----------------------*/}
            <div className={style.contenedorDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label  className={style.label}>
                Imagen
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleInputChange}
                className={style.inputs}
                style={{ fontSize: '20px', margin: '5px', display: 'flex', flexDirection: 'column'}}
              />
              <div>
              </div>
              {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
              {form.imagen && (
                <img
                  alt="user"
                  className={style.imageFile}
                  src={form.imagen}
                  id="imagen"
                />
              )}
            </div>
            <button type="submit" className={style.actualizar} disabled={form.telefono || form.direccion ? false : true}>Actualizar</button>
          </form>
        </CloudinaryContext>
      </div>
    </div>
  );
}
