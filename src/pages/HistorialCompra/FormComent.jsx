import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import style from "./Coment.module.css";

const FormComent = (props) => {

  //const api_host= "http://localhost:3001/";
const api_host = 'https://henry-market-back-production.up.railway.app/'

  const { idUsuario, producto, id_producto, id_detalle_venta } = props; 
  // const usuarioId = idUsuario;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).every((value) => value === "")) {
      const data = {
        id_producto: id_producto,
        descripcion_motivo: form.comentario,
        valor_calificacion: form.calificacion,
        id_usuario: idUsuario,
        id_detalle_venta: id_detalle_venta,
      };
  
      axios.post(`${api_host}products/${id_producto}/calificacion`, data)
        .then(() => {
          window.location.href = "/historial-de-compra";
          setShowForm(false);
          swal({
            title: 'Comentado',
            text: 'Gracias por tu opinion!',
            icon: 'success',
            timer: '2000',
            button: 'Accept'
        });
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
  };

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

    const [ form, setForm] = useState({
        comentario: "",
        calificacion: "",
    });

    const [ errors, setErrors ] = useState({
        comentario: "",
        calificacion: "Califica el producto",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setForm((prevForm) => ({
        //utiliza el estado anterior
          ...prevForm,
          [name]: value,
        }));

        validarFormulario({
            ...form,
            [name]: value,
          });

    };

    const validarFormulario = (form) => {
        setErrors((prevErrors) => ({
        //utiliza el estado anterior
          ...prevErrors,
          calificacion: !form.calificacion ? "Calificacion obligatoria" : "",
          comentario: form.comentario && form.comentario.length >= 50
            ? "Maximo 50 caracteres"
            : ""
        }));
      };
  return (

    <>
        {showForm ? (
          <div className={ style.container }>
            <button className={style.cerrar} onClick={handleCerrar}>X</button>
            <form onSubmit={handleSubmit} className={style.contenedor} >
              <h2 className={style.label} >{producto} </h2>
              {errors.calificacion ? 
                <h3>{errors.calificacion}</h3>  
                :
                null
              }
              {errors.comentario && !errors.calificacion ?
                <h3>{errors.comentario}</h3>  
                :
                null  
              }               

              <div className={style.contstars} >    
                <div className={style.rating} value={form.name}>
                    <input 
                        type="radio" 
                        id="star5" 
                        name="calificacion" 
                        value="5"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="star5" title="text"></label>
                    <input 
                        type="radio" 
                        id="star4" 
                        name="calificacion" 
                        value="4" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="star4" title="text"></label>
                    <input 
                        type="radio" 
                        id="star3" 
                        name="calificacion" 
                        value="3" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="star3" title="text"></label>
                    <input 
                        type="radio" 
                        id="star2" 
                        name="calificacion" 
                        value="2" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="star2" title="text"></label>
                    <input 
                        type="radio" 
                        id="star1" 
                        name="calificacion" 
                        value="1" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="star1" title="text"></label>
                </div>
            </div>

            <div >
                <input 
                    className={style.input} 
                    type="text" 
                    value={form.comentario} 
                    name='comentario' 
                    onChange={handleInputChange} 
                    placeholder="Inserta un breve comentario del producto"
                />
            </div>

              <br></br>
              <button 
                className={style.actualizar} 
                type="submit" 
                disabled={ !errors.comentario && form.calificacion ? false : true} 
              >
                Actualizar
              </button>
            </form>
          </div>
        ) : null}
        </>
  )

}

export default FormComent;
