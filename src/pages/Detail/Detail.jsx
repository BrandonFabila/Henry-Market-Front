import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getProductById,
  agregarAlCarrito,
  cleanProduct,
  agregarCount,
  getReviews,
  cleanReviews,
} from "../../store/actions/index";
import Cookies from "js-cookie";
import swal from "sweetalert";

import QuantityDisplay from "../../components/quantitydisplay/QuantityDisplay";
import Loader from "../../components/loader/loader";
import CardsReviews from "../../components/cardsReview/CardsReview";

import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { id_producto } = useParams();
  const { product, carrito } = useSelector((state) => state);

  let [quantity, setQuantity] = useState(1);
  const count = useSelector((state) => state.countCarrito);

  const estaLogueado = localStorage.getItem("estaLogueado");

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (estaLogueado) {
      const userSession = JSON.parse(Cookies.get("user_session"));
      if (userSession && userSession.dataValues) {
        const { admin } = userSession.dataValues;
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
    }
  }, [estaLogueado]);

  const exists = carrito?.find((e) => {
    return e.id_producto === product.id_producto;
  });

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id_producto)).finally(() => setLoading(false));
    dispatch(getReviews(id_producto));
    return () => {
      dispatch(cleanProduct());
      dispatch(cleanReviews());
    };
  }, [dispatch, id_producto]);

  const handlerCarrito = () => {
    if (estaLogueado === "database" || estaLogueado === "google") {
      if (!exists) {
        dispatch(agregarAlCarrito(product, quantity));
        dispatch(agregarCount(quantity));
        setQuantity(1);
        swal({
          title: `Agregaste ${product.nombre}`,
          icon: "success",
          timer: "3000",
          showConfirmButton: false,
        });
      } else {
        dispatch(agregarAlCarrito(product, quantity));
        dispatch(agregarCount(quantity));
        setQuantity(1);
        if (quantity === 1) {
          swal({
            title: `Has añadido ${quantity} unidad más`,
            text: `${product.nombre}`,
            icon: "success",
            timer: "3000",
          });
        } else {
          swal({
            title: `Has añadido ${quantity} unidades`,
            text: `${product.nombre}`,
            icon: "success",
            timer: "3000",
          });
        }
      }
    } else {
      swal({
        title: `Debe de iniciar sesion para comprar`,
        icon: "info",
        timer: "3000",
      });
    }
  };

  // Cantidad de articulos
  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (exists) {
      if (exists.cantidad === 25) {
        swal({
          title: `Máximo 25 unidades de ${product.nombre} por compra`,
          icon: "info",
        });
      } else if (
        exists.cantidad + quantity <= 24 &&
        quantity !== product.existencia
      ) {
        if (count + quantity <= 49) {
          setQuantity(quantity + 1);
        } else {
          swal({
            title: `Carrito lleno`,
            text: `No puedes agregar más de 50 productos`,
            icon: "info",
          });
        }
      }
    } else {
      if (quantity === product.stock) {
        swal({
          title: `Máximas unidades disponibles de ${product.nombre} alcanzadas`,
          icon: "info",
        });
      } else if (quantity <= 24 && quantity !== product.existencia) {
        if (count + quantity <= 49) {
          setQuantity(quantity + 1);
        } else if (quantity === 50) {
          swal({
            title: `Carrito lleno`,
            text: `No puedes agregar más de 50 productos`,
            icon: "info",
          });
        } else {
          swal({
            title: `Carrito a punto de llenarse`,
            text: `No puedes agregar más de 50 productos`,
            icon: "info",
          });
        }
      }
    }
  };

  //Boton comprar ahora
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handlerComprar = () => {
    const exists = carrito?.find((e) => {
      return e.id_producto === product.id_producto;
    });
    console.log(shouldRedirect);
    if (estaLogueado === "database" || estaLogueado === "google") {
      if (!exists) {
        dispatch(agregarAlCarrito(product, quantity, count));
        dispatch(agregarCount(quantity));
      }
      setShouldRedirect(true);
    } else {
      swal({
        title: `Debe de iniciar sesion para comprar`,
        icon: "info",
        timer: "3000",
      });
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.mainContainer}>
            <div className={styles.back}>
              <Link to={`/products/categoria/${product.id_categoria_producto}`}>
                <button className={styles.button}>atrás</button>
              </Link>
            </div>
            <div className={styles.title}>
              <h1>{product.nombre}</h1>
            </div>
            <div className={styles.container}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.image}
                  src={product.imagen}
                  alt={product.nombre}
                />
              </div>
              <div className={styles.information}>
                <h4 className={styles.descripcion_producto}>
                  {product.descripcion_producto}
                </h4>
                <h5>
                  Stock:{" "}
                  {product.stock > 1 ? "Disponible ✔" : "No hay Existencias ✘"}
                </h5>
                {product.valor_descuento ? (
                  <div>
                    <h3 className={styles.valord}>${product.valor}</h3>
                    <h2 className={styles.valor}>${product.valor_descuento}</h2>
                  </div>
                ) : (
                  <div>
                    <h2 className={styles.valor}>${product.valor}</h2>
                  </div>
                )}
              </div>
            </div>

            {!isAdmin && (
              <div>
                <div>
                  <h4>Selecciona la cantidad</h4>
                  {product.stock !== 1 ? (
                    <span style={{ color: "gray" }}>
                      ({product.stock} disponibles)
                    </span>
                  ) : (
                    <span style={{ color: "gray" }}>
                      ({product.stock} disponible)
                    </span>
                  )}
                  <QuantityDisplay
                    quantity={quantity}
                    totalProducts={count}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                  />
                </div>

                <div style={{ margin: "15px" }}>
                  <Link to="/carrito">
                    <button className={styles.button} onClick={handlerComprar}>
                      Comprar
                    </button>
                  </Link>
                  <button
                    className={styles.button}
                    disabled={quantity >= 26 || quantity + count >= 51}
                    onClick={handlerCarrito}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.box2}>
          <div className={styles.box2Hijo}>
            <CardsReviews />
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
