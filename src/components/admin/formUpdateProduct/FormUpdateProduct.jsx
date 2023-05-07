import { useState, useEffect } from "react";
import axios from "axios";
import { updateProduct,   getProductById } from "../../../store/actions/index";
import {  useDispatch } from "react-redux";
import {CloudinaryContext } from "cloudinary-react"; 
//import Cookies from "js-cookie";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import style from "./formUpdateProduct.module.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";


export default function FormUpdateProduct() {
  //const { categorys } = useSelector(state => state);
  const dispatch = useDispatch();
  const { id_producto } = useParams();
  //const session = Cookies.get("commerce_session");

 // let values = JSON.parse(session)
  //let comercio = values.dataValues

  useEffect(() => {
    dispatch(getProductById(id_producto))
      .then((result) => {
        // Aquí puedes acceder a la información devuelta por getProductById
        console.log("RESULTADO", result);
      })
      .catch((error) => {
        // Aquí puedes manejar el error en caso de que getProductById falle
        console.error(error);
      });

  }, [dispatch, id_producto]);

  //const productoEditable = useSelector(state => state.product)

  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    /*const { nombre,
      cantidad,
      descripcion_producto,
      existencia,
      fecha_final,
      fecha_inicial,
      imagen,
      id_categoria_producto,
      valor_normal,
      valor_con_descuento,
      condicion,
    } = form;*/
   
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("FORME: ", errors)
    } else {
      try {
        const filteredData = Object.fromEntries(
          Object.entries(form).filter(([_, value]) => !!value)
        );
     
        console.log("FORM: ", form)
        dispatch(updateProduct(filteredData))
       

        setShouldRedirect(true);
      } catch (error) {
        console.error("Error al encriptar la password:", error);
      }
    }
  };

  const [shouldRedirect, setShouldRedirect] = useState(false);
  // const handleInputChange = event => {
  //   const property = event.target.name;
  //   const value = event.target.value;
  //   //   Verificar si el input es de tipo file
  //   if (event.target.type === "file") {
  //     const file = event.target.files[0]; // Obtener el archivo seleccionado
  //     setForm({ ...form, [property]: file }); // Actualizar el estado con el archivo seleccionado
  //   } else {
  //     setForm({ ...form, [property]: value });

  // };

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
      formData.append("upload_preset", "ajr7own3"); // Reemplazar con tu upload preset de Cloudinary
      formData.append("api_key", "581299476786456"); // Reemplazar con tu API Key de Cloudinary

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfmkjxjsf/image/upload",
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
      setForm({
        ...form,
        [property]: value
      });
    }
  }
  const [form, setForm] = useState({
    nombre: "",
    descripcion_producto: "",
    stock:"",
    valor: "",
    valor_descuento: "",
    id_categoria_producto: "",
    imagen: "",
    id_producto: Number(id_producto)

  });
  const handleBorrar = async (id_producto) => {
    try {
      swal({
        title: "¿Estás seguro de que quieres eliminar este producto?",
        text: "Una vez eliminado, no podrás recuperarlo",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.put(`http://localhost:3001/products/delete/${id_producto}`);
          swal("¡Producto eliminado!", {
            icon: "success",
          });
        } else {
          swal("Producto no eliminado");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { product } = useSelector((state) => state);
  console.log("aaaaaaaaaaaaa",product);

  console.log("formmmmmmmmmmmmmmmmmmmm: ", form)
  return (
    <>
      {shouldRedirect ? (
        <Navigate to="/adminHome" />
      ) : (

        /* ----------------------- CONTENEDOR GENERAL -----------------------*/
        <div className={style.contenedor}>
          {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
          <div className={style.formContainer}>
            <CloudinaryContext cloudName="dfmkjxjsf">
              <h2 style={{ margin: '15px' }}>Editar o eliminar un producto</h2>
              <form onSubmit={handleSubmit}>

                {/* ----------------------- Nombre -----------------------*/}
                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Nombre del producto
                  </label>
                  <input
                  placeholder={product.nombre}
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    className={style.forminput}
                  />
                  {errors.nombre && (
                    <div className={style.errors}>{errors.nombre}</div>
                  )}
                </div>

                {/* ----------------------- EXISTENCIA -----------------------*/}
                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Cantidad de stock
                  </label>
                  <input
                    placeholder={product.stock}
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    className={style.forminput}
                  />
                  {errors.telefono && (
                    <div className={style.errors}>{errors.stock}</div>
                  )}
                </div>

                {/* ----------------------- VALOR NORMAL -----------------------*/}
                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Valor regular
                  </label>
                  <input
                  placeholder={product.valor}
                    type="number"
                    name="valor"
                    value={form.valor}
                    onChange={handleInputChange}
                    className={style.forminput}
                  />
                  {errors.valor && (
                    <div className={style.errors}>{errors.valor}</div>
                  )}
                </div>




                {/* ----------------------- VALOR CON DESCUENTO  -----------------------*/}
                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Valor con descuento
                  </label>
                  <input
                  placeholder={product.valor_descuento}
                    type="number"
                    name="valor_descuento"
                    value={form.valor_descuento}
                    onChange={handleInputChange}
                    className={style.forminput}

                  />
                  {errors.valor_descuento && (
                    <div className={style.errors}>{errors.valor_descuento}</div>
                  )}
                </div>

                {/* ----------------------- IMAGEN -----------------------*/}
                <div className={style.contenedorDiv}>
                  <label htmlFor="" className={style.formlabel}>
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleInputChange}
                    className={style.forminput}

                  />
                  <div>
                  </div>
                  <span style={{ color: 'grey' }}> - vista previa de la imagen aquí -</span>
                  {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                  {form.imagen && (
                    <img
                      className={style.imageFile}
                      src={form.imagen}
                      id="imagen"
                      alt="foto perfil"
                    />
                  )}
                </div>

                <button onClick={() => { handleBorrar(id_producto) }} className={style.eliminar}>Eliminar</button>

                <button type="submit">Confirmar cambios</button>
              </form>
            </CloudinaryContext>
          </div>
        </div>
      )}

    </>
  );
}