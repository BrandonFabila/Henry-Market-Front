import { MdMenu } from "react-icons/md";
import Drawer from 'react-modern-drawer';
import "react-modern-drawer/dist/index.css";
import { useDispatch } from 'react-redux';
import {getAllProducts, getProductFiltered,orderedByNameASC,orderedByNameDESC,orderedByHighestPrice,orderedByLowestPrice,orderedByRecientes } from "../../store/actions";
// getProductFilteredDescuento,
import { Link , useNavigate} from "react-router-dom";
// useParams,
import swal from "sweetalert";
import { useState } from "react";
import styles from './drawer.module.css'
import { vaciarCarrito } from "../../store/actions";






export default function DrawerMenu({estaLogueado, userData}) {
    const [showCategories, setShowCategories] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showOrdenar, setShowOrdenar] = useState(false);
    const [showPrecio, setShowPrecio] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    // const {id_categoria_producto} = useParams();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogOut = () => {
        setIsAdmin(false);
        setShowProfileMenu(!showProfileMenu);
        window.localStorage.removeItem("estaLogueado");
        window.localStorage.removeItem("carrito");
        window.localStorage.removeItem("count");
        // dispatch(userLoggedIn(logOut));
        dispatch(vaciarCarrito());
        setIsAdmin(false);
        swal({
          title: "Sesión cerrada con éxito",
          icon: "info",
          timer: "2000",
        });
      };

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    };

    const handleClick = () => {
        setShowCategories(!showCategories);
    };

    const handleClick2 = () => {
        setShowOrdenar(!showOrdenar);
    };

    const handleClick3 = () => {
        setShowPrecio(!showPrecio);
    };

    const handleClick4 = () => {
        setShowUser(!showUser);
    };

    return (
        <>
            <div onClick={toggleDrawer} style={{ cursor: 'pointer' }}><MdMenu size={40} /></div>

            <Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
                <div className={styles.nav_contenedor}>
                    <nav className={styles.nav}>
                        <ul className={styles.list}>
                            <li className={styles.list_item}>
                                <div className={styles.list_button}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASBJREFUSEvllIENwkAMA80msAlsApMAk8AmsAlsAjqpfrnPA20lkBCR0NN8aidO0pk+bLMP4+sZwUHSeiT5XtJR0jXfaxHsJG1HgjscEt4vVhPMJV2625Wks6SlpFP3Hx/GM/5Nl7VjuFtkFTWBpQHYYK4os3PcO1+vB5lFEjtbV0SW9AeSTITqieUsVSQQ0nBZ63jrZMnYlDL9rrYQtwhSwwQa42eSiO9JlPrTPMCZJqTDyGqon3EltkeQ2dZTSkbcD/UXZeopst4GdCaAUyEnP/z0Cku/E3hLMPUT8jAQzyr4KgFNzmZbBpqOTJy2SRV4Pxo97i0a95MIWovWBPsPgld6t3rQ8pXPRL3JPDMxXpyhgBn3MFlT530w+e8T3AEGdlkZEzbOHwAAAABJRU5ErkJggg==" alt="ver-todo"/>
                                    <span
                                        tabIndex="0"
                                        className={styles.nav_link}
                                        onClick={() => dispatch(getAllProducts())}
                                    >
                                        Ver Todo
                                    </span>
                                </div>
                            </li>
                            {/* <li className={styles.list_item}>
                                <div>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWBJREFUSEu1lY1NwzAQhV8noWwCk1AmASaBTgKbAJOAvsgvul58iUuppaqtcrl378f2Tldeuyv31wjAnaRXSUdJb22gg6QHSY+SPtaGHAF4lwQI60vSPjTk/+25ADRgwpvWzM2rPmbF85c2xFzbY4AcAPxlAfAcXzwXwPU/BTps8GWVQdTchRjJdDYUhk/JD2p5fl8BOC3RROt6Qrs1oO6zwwTjAeH7JKYVbVJCsb3ht+PZY+u0TemKHlTmZoAR82cvIkBFOSeDOj5Iig+95aEWO7knE5KwizEw71rMhnlcpQej+Z/Mazu4Yt2ViETkBLkRTUkSkpiRk1WxXphMc1KRQRabJ+hh0CzRfAjmnUxzpMrnDyD2gWZV3epG8xRrXvzLUdGjPZJ9aobOonhc89LWyYosGP/dAJyyaaitCydrnS+cheaZ6haADSVdmIx8ZkhkOdQuvjJH9e/WjTC4COAXAcVVGWZcFaYAAAAASUVORK5CYII=" alt="precio" />
                                    <span
                                        tabIndex="0"
                                        className={styles.nav_link}
                                        onClick={() => dispatch(getProductFilteredDescuento(id_categoria_producto))}
                                    >
                                    Descuentos
                                    </span>
                                </div>
                            </li> */}
                            <li className={`${styles.list_item} ${styles.list_item_click}`}>
                        <div className={`${styles.list_button} `}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlckNAjEQBGszgUwgE4gEiAQRCWQCmYBaspHv2QOLz/pjyWNP9bSvgc5t6JyfsYAdcALUv4AHcHN9U+MYwAG4VrJcgHOLYAGk+O4S+GQbQFBVpLZvVWIBpFzJSkp9ZbJLkGKzAE9AirfO+zCJxhXXnig+C/B2q2pCrHh2iuS3fF/SoopSZV7REoDWfvPWAH7csiCNZ/P/Dphq1eQKVkB2D6xTY1m27oHlEKZFv3iLouc7vcnh12jKLUzQQ3cMPyDrP5gDidZ0B3wAmnU0GbcMQx8AAAAASUVORK5CYII=" alt="categorias" />
                            <span className={styles.nav_link} onClick={handleClick}>
                                Categorias
                            </span>
                        </div>
                        {showCategories && (
                            <ul className={styles.list_show}>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(1));
                                        navigate('/products/categoria/1');
                                        }}
                                >
                                    Indumentaria
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(2));
                                        navigate('/products/categoria/2');
                                        }}
                                >
                                    Electrodomesticos
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(3));
                                        navigate('/products/categoria/3');
                                        }}
                                >
                                    Informatica
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(4));
                                        navigate('/products/categoria/4');
                                        }}
                                >
                                    Cosmética
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(5));
                                        navigate('/products/categoria/5');
                                        }}
                                >
                                    Alimentos
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(6));
                                        navigate('/products/categoria/6');
                                        }}
                                >
                                    Juguetes
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(7));
                                        navigate('/products/categoria/7');
                                        }}
                                >
                                    Muebles
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(8));
                                        navigate('/products/categoria/8');
                                        }}
                                >
                                    Jardinería
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(9));
                                        navigate('/products/categoria/9');
                                        }}
                                >
                                    Deportes
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(10));
                                        navigate('/products/categoria/10');
                                        }}
                                >
                                    Joyería
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        dispatch(getProductFiltered(11));
                                        navigate('/products/categoria/11');
                                        }}
                                >
                                    Herramientas
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`${styles.list_item} ${styles.list_item_click}`}>
                        <div className={`${styles.list_button} `}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQhJREFUSEvVlA0OAUEMhd/ehJtwEpwEJ8FJuAk3IZ9MN2MzM621JJqIv51+r33tdPpydF/OryhgJmkraZEE3SRtJPHejAiA5NdKlrkHiQAOktaSLpL2CWTV8H3XKiECuKcEuVpadU7q+b0aEUDpsLUNDyYHoN5adExmT1YBbcknaTmFybk68wPlp2T8x2NqCfJxdcfTDkVNHu4C5rrtARIB2EjyPLsAjBfhVuIBhslRTdjy8ZkrA0+K0QKwvSQiSuPIBjOuRHWja4CoQhdSAuSzTkvoeyuArJIvVEK1/S07BLyb3MB4RdWYj6D+Ks8BeVsc0e7fQJ4D8VOAK2vMA94ejMn5cub/AQ9dbTkZoV0kIAAAAABJRU5ErkJggg==" alt="ordenar" />
                            <span className={styles.nav_link} onClick={handleClick2}>
                                Ordenar
                            </span>
                        </div>
                        {showOrdenar && (
                            <ul className={styles.list_show}>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                onClick={() => dispatch(orderedByNameASC())}
                                >
                                    Por nombre a-z
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => dispatch(orderedByNameDESC())}
                                >
                                    Por nombre z-a
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_button}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWBJREFUSEu1lY1NwzAQhV8noWwCk1AmASaBTgKbAJOAvsgvul58iUuppaqtcrl378f2Tldeuyv31wjAnaRXSUdJb22gg6QHSY+SPtaGHAF4lwQI60vSPjTk/+25ADRgwpvWzM2rPmbF85c2xFzbY4AcAPxlAfAcXzwXwPU/BTps8GWVQdTchRjJdDYUhk/JD2p5fl8BOC3RROt6Qrs1oO6zwwTjAeH7JKYVbVJCsb3ht+PZY+u0TemKHlTmZoAR82cvIkBFOSeDOj5Iig+95aEWO7knE5KwizEw71rMhnlcpQej+Z/Mazu4Yt2ViETkBLkRTUkSkpiRk1WxXphMc1KRQRabJ+hh0CzRfAjmnUxzpMrnDyD2gWZV3epG8xRrXvzLUdGjPZJ9aobOonhc89LWyYosGP/dAJyyaaitCydrnS+cheaZ6haADSVdmIx8ZkhkOdQuvjJH9e/WjTC4COAXAcVVGWZcFaYAAAAASUVORK5CYII=" alt="precio" />
                            <span
                                tabIndex="0"
                                className={styles.nav_link}
                                onClick={handleClick3}
                            >
                                Precio
                            </span>
                        </div>
                        {showPrecio && (
                            <ul className={styles.list_show}>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => dispatch(orderedByHighestPrice())}
                                >
                                    Mayor precio
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                onClick={() => dispatch(orderedByLowestPrice())}
                                >
                                    Menor precio
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className={styles.list_item}>
                        <div className={styles.list_button}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANhJREFUSEvtldENgzAMRI9N2k3KJmWSqpO0m5RNyiZUR+MoorbjCPFRCT7D5Z4526LDzk+3sz8OQDXhMqIXgEv1RkwwAThTWgLm2N2wavHeAngCuDq4TYAewAjg4UDCAJox03eqlsY84+P17QfAC6dUVdnsIQFolptnmBMu+qUCbdEIkWrXEUs0LIBA630+tzZZmygx9wrgaPIrTYAWEcVa7uveiM6MyNoDK/eyN9q0hqeI804zK3drFcIAGtwB3MI7/BU2ARq9dYC3la2APBTHD6ca3f9H9AET9TAZjvnCQgAAAABJRU5ErkJggg==" alt="más recientes" />
                            <span
                                tabIndex="0"
                                className={styles.nav_link}
                                onClick={() => dispatch(orderedByRecientes())}
                            >
                                Más recientes
                            </span>
                        </div>
                    </li>
                    {estaLogueado ? (
                        <li className={styles.list_item}>
                        <div className={styles.list_button}>
                            <img style={{width: '45px', borderRadius: '50%'}} src={userData.imagen} alt="user" />
                            <span
                                tabIndex="0"
                                className={styles.nav_link}
                                onClick={handleClick4}
                            >
                                ¡Hola {userData.primer_nombre}!
                            </span>
                        </div>
                        {isAdmin ? null : null}
                        {showUser && (
                            <ul className={styles.list_show}>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        navigate('/account');
                                        }}
                                >
                                    Ver mi Perfil
                                </li>
                                <li
                                    tabIndex="0"
                                    className={styles.list}
                                    onClick={() => {
                                        navigate('/historial-de-compra');
                                        }}
                                >
                                    Historial de compras
                                </li>
                                <Link
                                    to='/'
                                    className={styles.list}
                                    onClick={() => {
                                        handleLogOut()
                                        }}
                                >
                                    Cerrar sesión
                                </Link>
                            </ul>
                        )}
                    </li>
                    ) : (
                        <>
                        <li className={styles.list_item}>
                        <div className={styles.list_buttonS}>
                            <Link to='/login'>
                                <span
                                    tabIndex="0"
                                    className={styles.nav_link}
                                >
                                    Iniciar sesión
                                </span>
                            </Link>
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_buttonS}>
                            <Link to='/register'>
                                <span
                                    tabIndex="0"
                                    className={styles.nav_link}
                                >
                                    Registrarse
                                </span>
                            </Link>
                        </div>
                    </li>
                    </>
                    
                    )}
                    
                    
                </ul>

                </nav>
                </div>
            </Drawer>
        </>
    )
}