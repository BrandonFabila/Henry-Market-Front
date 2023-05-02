import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert";
import validations from "./validations";
import style from "./FormUpdate.module.css";

export default function FormUpdate({ idUsuario, updateUserData }) {
  const { ciudades } = useSelector(state => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id_usuario: null,
    primer_nombre: "", 
    primer_apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    imagen: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentErrors = validations(form);
    setErrors(currentErrors);
  }, [form]);

  const updatedUserData = updateUserData;
  console.log(updatedUserData);
  const usuarioId = idUsuario;
  console.log(usuarioId);



  const handleSubmit = async (event) => {
    event.preventDefault();

    // captura de datos del estado form
    const data = {
      id_usuario: form.id_usuario,
      primer_nombre: form.primer_nombre,
      primer_apellido: form.primer_apellido,
      direccion: form.direccion,
      telefono: form.telefono,
      email: form.email,
      estado: form.estado,
      imagen: form.imagen
    };

    const { primer_nombre,
      primer_apellido,
      direccion,
      telefono,
      email,
      password,
    } = form;

    const errors = validations({
      primer_nombre,
      primer_apellido,
      direccion,
      telefono,
      email,
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
        .put(`http://localhost:3001/usuario`, filteredData)
        .then(res => swal({
          title: 'Actualización Exitosa',
          text: 'Ya puedes ver tus cambios reflejados',
          icon: 'success',
          timer: '2000'
        }))

      //dispatch(getUserById(usuarioId))
      window.location.reload() // Actualiza la página     
        .catch(err => swal({
          text: 'Error',
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
        console.log(response.data.secure_url);
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
    <>
      <div className={style.contenedor}>
        <div className='form-container' style={{ padding: '15px', marginTop: '70px', marginBottom: '15px' }}>
          <CloudinaryContext cloudName="dfmkjxjsf">
            <form onSubmit={handleSubmit}>
              <label for="" style={{ fontWeight: '600' }}>
                Actualizar datos de Perfil
              </label>

              <div className={style.nombres}>
                <div className={style.contenedorDiv}>
                  <label for="" className='form-update-label'>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="primer_nombre"
                    value={form.primer_nombre}
                    onChange={handleInputChange}
                    className='form-input'
                    style={{ fontSize: '15px', margin: '5px' }}

                  />

                  {errors.primer_nombre && (
                    <div className={style.errors}>{errors.primer_nombre}</div>
                  )}

                </div>

              </div>

              {/* ----------------------- PRIMER APELLIDO -----------------------*/}
              <div className={style.apellidos}>
                <div className={style.contenedorDiv}>

                  <label for="" className='form-update-label'>
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="primer_apellido"
                    value={form.primer_apellido}
                    onChange={handleInputChange}
                    className='form-input'
                    style={{ fontSize: '15px', margin: '5px' }}
                  />
                  {errors.primer_apellido && (
                    <div className={style.errors}>{errors.primer_apellido}</div>
                  )}
                </div>

    
              </div>


              {/* ----------------------- DIRECCION -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-update-label'>
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.direccion && (
                  <div className={style.errors}>{errors.direccion}</div>
                )}
              </div>

              {/* ----------------------- TELEFONO -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-update-label'>
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.telefono && (
                  <div className={style.errors}>{errors.telefono}</div>
                )}
              </div>

              {/* ----------------------- EMAIL -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-update-label'>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.email && (
                  <div className={style.errors}>{errors.email}</div>
                )}
              </div>


             

              {/* ----------------------- IMAGEN -----------------------*/}
              <div className={style.contenedorDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor="" className='form-update-label'>
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '13px', margin: '5px' }}
                />
                <div>
                </div>

                {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                {form.imagen && (
                  <img
                    className={style.imageFile}
                    src={form.imagen}
                    id="imagen"
                  />
                )}
              </div>

              <button type="submit" style={{ fontSize: '15px', margin: '5px' }}>Actualizar</button>
            </form>
          </CloudinaryContext>
        </div>


      </div>
    </>
  );
}
