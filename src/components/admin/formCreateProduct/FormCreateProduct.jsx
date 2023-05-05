import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import { getCategorys } from "../../../store/actions/index"
import Cookies from "js-cookie";

import style from "../formCreateProduct/FormCreateProduct.module.css"


export default function FormCreateProduct() {
  const api_host= "http://localhost:3001/";
  // const api_host = 'https://henry-market-back-production.up.railway.app/'
  const { categorys} = useSelector(state => state);

  const dispatch = useDispatch();

  const session = Cookies.get("user_session");
  let values = JSON.parse(session)
  let user = values.dataValues

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    // let {
      // nombre,
      // stock,
      // descripcion_producto,
      // imagen,
      // id_categoria_producto,
      // valor,
      // valor_descuento,
    // } = form;


    // stock = parseInt(stock);
    // valor = parseFloat(valor);
    // valor_descuento = parseFloat(valor_descuento);




    if (Object.keys(errors).length > 0) {
      setErrors(errors); 
    } else {
      try {
       
        const formData = {
          ...form,
          stock: parseInt(form.stock),
          valor: parseFloat(form.valor),
          valor_descuento: parseFloat(form.valor_descuento),
        };

        console.log(formData);

        await axios.post(`${api_host}products`, formData).then(res => {
          swal({
            title: "producto creado correctamente",
            text: "asd",
            icon: "success",
            timer: "2000",
          });
          setShouldRedirect(true);
        }).catch(err => {
          swal({
            title: "Error",
            text: "intente nuevamente",
            icon: "error",
            timer: "2000",
            button: "Accept",
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };







  const [shouldRedirect, setShouldRedirect] = useState(false);


  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    if (event.target.type === "file") {
      const file = event.target.files[0]; 
      let valor = 0;
      if (file) valor = 1
      console.log(valor);
   
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "im2gqbe4"); 
      formData.append("api_key", "341983536529681"); 


      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcel6k4l6/image/upload",
          formData
        );

        console.log(response.data.secure_url);
        const imageUrl = response.data.secure_url;


        setForm({
          ...form, 
          imagen: imageUrl 
        });
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    } else {
      setForm({
        ...form,
        [property]: value
      });
    }
  }

  const [form, setForm] = useState({
    nombre: "",
    descripcion_producto: "",
    valor: "",
    valor_descuento: "",
    stock: "",
    id_categoria_producto: "",
    imagen: "",
    admin: user.admin
  });

  return (
    <>
      {shouldRedirect ? (
        <Navigate to="/" replace={true}/>
      ) : (
        <div className='form-container' style={{padding: '15px'}}>
          <CloudinaryContext cloudName="dfmkjxjsf">
            <form onSubmit={handleSubmit}>
              {/* ----------------------- nombre -----------------------*/}
              
                <div className={style.contenedorDiv}>
                  <label  className='form-label'>
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    className='form-input'
                  />

                  {errors.nombre && (
                    <div className={style.errors}>{errors.nombre}</div>
                  )}
                </div>

                <div className={style.fechas}>
                  {/* ----------------------- fecha_inicial -----------------------*/}
                  <div className={style.contenedorDiv}>
                    <label  className='form-label'>
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleInputChange}
                      className='form-input'
                    />
                    {errors.stock && (
                      <div className={style.errors}>{errors.stock}</div>
                    )}

                  </div>

                </div>

  {/* ----------------------- descripcion de producto -----------------------*/}

              <div className={style.contenedorDiv}>
                  <label  className='form-label'>
                    Descripción del producto
                  </label>
                  <textarea
                    name="descripcion_producto"
                    value={form.descripcion_producto}
                    onChange={handleInputChange}

                    className='form-textarea'

                  />
                  {errors.descripcion_producto && (
                    <div className={style.errors}>{errors.descripcion_producto}</div>
                  )}
                </div>
                
              {/* ----------------------- VALOR NORMAL -----------------------*/}
              <div className={style.contenedorDiv}>
                <label  className='form-label'>
                  Valor 
                </label>
                <input
                  type="number"
                  name="valor"
                  value={form.valor}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.valor_normal && (
                  <div className={style.errors}>{errors.valor_normal}</div>
                )}
              </div>


              {/* ----------------------- VALOR CON DESCUENTO  -----------------------*/}
              <div className={style.contenedorDiv}>
                <label  className='form-label'>
                  Valor con descuento aplicado
                </label>
                <input
                  type="number"
                  name="valor_descuento"
                  value={form.valor_descuento}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.valor_con_descuento && (
                  <div className={style.errors}>{errors.valor_con_descuento}</div>
                )}
              </div>

              {/* ----------------------- Categoria -----------------------*/}
              <div className={style.contenedorDiv}>
                <label  className='form-label'>
                  Categoria
                </label>

                <div>

                  {errors.id_categoria_producto && (
                    <div className={style.errors}>{errors.id_categoria_producto}</div>
                  )}

                  <div className={style.contenedorDiv}>
                    <select
                      name="id_categoria_producto"
                      onChange={e => handleInputChange(e)}
                      className='form-input'
                    >
                      <option>Selecciona categoria</option>
                      {categorys &&
                        categorys.map(c => (
                          <option key={c.id_categoria_producto} value={c.id_categoria_producto} primary={c.nombre_categoria_producto}>
                            {c.nombre_categoria_producto}
                          </option>
                        ))}
                    </select>

                  </div>
                </div>
              </div>

              {/* ----------------------- IMAGEN -----------------------*/}
              <div className={style.contenedorDiv}>
                <label htmlFor="" className='form-label'>
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleInputChange}
                  className='form-input'
                />                

                {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                {form.imagen && (
                  <img
                    className={style.imageFile}
                    src={form.imagen}
                    id="imagen"
                    alt="foto"
                  />
                )}
              </div>

              <button type="submit" style={{fontSize: '25px'}}>Publicar oferta</button>
            </form>

          </CloudinaryContext>
        </div>
      )
      }
    </>
  );
}
