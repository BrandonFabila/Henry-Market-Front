import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductById, agregarAlCarrito, cleanProduct ,agregarCount, getReviews, cleanReviews, } from '../../store/actions/index';
import QuantityDisplay from '../../components/quantitydisplay/QuantityDisplay';
import styles from './Detail.module.css';
import Loader from '../../components/loader/loader';
import swal from 'sweetalert'
import CardsReviews from '../../components/cardsReview/CardsReview';
import s from "./Detail.module.css"


const Detail = () => {
  // const api_host = 'https://henry-market-back-production.up.railway.app/'


    const { id_producto } = useParams();
    const { product, carrito } = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const estaLogueado = localStorage.getItem("estaLogueado");

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id_producto)).finally(() => setLoading(false));
    dispatch(getReviews(id_producto))
    return (()=>{
      dispatch(cleanProduct())
      dispatch(cleanReviews())
    })
  }, [dispatch, id_producto])
  const handlerCarrito = () => {
    const exists = carrito?.find(e => {
      return e.id_producto === product.id_producto
    })


   if(estaLogueado === "database" || estaLogueado === "google"){
    if(!exists){
      dispatch(agregarAlCarrito(product, quantity))
      dispatch(agregarCount(quantity))
       swal({
         title: `Agregaste ${product.nombre}`,
         icon: "success",
         timer: "3000",
         showConfirmButton: false
       })
      }else{
        swal({
          title: `Este articulo ya está agregado`,
          text: "Para modificar la cantidad dirijase al carrito de compra",
          icon: "error",
          timer: "3000"
        })
      }
   }else{
    swal({
      title: `Debe de iniciar sesion para comprar`,
      icon: "info",
      timer: "3000"
    })
   }
  }  
  
  // Cantidad de articulos
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleIncrease = () => {
    if (quantity !== product.existencia) {
      setQuantity(quantity + 1);
    } else {
      swal({
        title: 'Número máximo de unidades disponibles',
        icon: 'info'
      })
    }
  }
  //Boton comprar ahora
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handlerComprar = () => {
    const exists = carrito?.find(e => {
      return e.id_producto === product.id_producto
    })
    console.log(shouldRedirect)
    if(estaLogueado === "database" || estaLogueado === "google"){
      if(!exists){
        dispatch(agregarAlCarrito(product, quantity))
        dispatch(agregarCount(quantity))
      }
      setShouldRedirect(true)
    }else{
      swal({
        title: `Debe de iniciar sesion para comprar`,
        icon: "info",
        timer: "3000"
      })

    }
  }

  return (
    <>
      <div>
        {loading ? (
            <Loader/>
        ) : (
            <div className={styles.mainContainer}>
                <div className={styles.back}>
                  <Link to={`/products/categoria/${product.id_categoria_producto}`}>
                      <button className={styles.button} >atrás</button>
                  </Link>
                </div>
                <div className={styles.title}>
                    <h1>{product.nombre}</h1>
                </div>
                <div className={styles.container}>
                  <div className={styles.imgContainer}>
                      <img className={styles.image} src={product.imagen} alt={product.nombre} />
                  </div>
                  <div className={styles.information}>
                      <h4 className={styles.descripcion_producto}>{product.descripcion_producto}</h4>
                      <h5>Stock: {product.stock > 1 ? 'Disponible ✔' : 'No hay Existencias ✘' }</h5>
                      {product.valor_descuento 
                        ? <div>
                            <h3 className={styles.valord}>${product.valor}</h3>
                            <h2 className={styles.valor}>${product.valor_descuento}</h2>
                          </div> 
                        : <div>
                            <h2 className={styles.valor}>${product.valor}</h2>
                          </div> }
                  </div>               
            </div>          
            <div>
            <div>
                  <h4>Selecciona la cantidad</h4>
                  {product.stock !== 1
                    ? (<span style={{ color: "gray" }}>({product.stock} disponibles)</span>)
                    : (<span style={{ color: "gray" }}>({product.stock} disponible)</span>)}
                  <QuantityDisplay
                    quantity={quantity}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                  />
                </div>

                <div style={{ margin: '15px' }}>
                  <Link to='/carrito'>
                  <button className={styles.button} style={{ width: 'auto', marginRight: '10px' }} onClick={handlerComprar}>Comprar</button>
                  </Link>
                  <button className={styles.button} style={{ width: 'auto' }} onClick={handlerCarrito}>Agregar al carrito</button>
                </div>
                </div>
            </div>
        )
        }
        <div className={s.box2}>
            <div className={s.box2Hijo}>
              <CardsReviews />
            </div>
          </div>

         
        </div>
        
    </>
  )
}

export default Detail