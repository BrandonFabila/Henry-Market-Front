import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
// import { getUsuarioByEmail } from "../../store/actions/index";

import DrawerMenu from '../DrawerMenu/DrawerMenu'
import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";

import { useDispatch } from 'react-redux'
import SearchBar from "./SearchBar/SearchBar";
import logoCompleto from '../../media/logoCompleto-blanco.png'
import logotipo from '../../media/logotipo-blanco.png'
import { vaciarCarrito } from '../../store/actions';


import s from './nav.module.css'
//useMemo
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import state from "sweetalert/typings/modules/state";

export default function NavBar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const estaLogueado = window.localStorage.getItem("estaLogueado");

    const [isAdmin, setIsAdmin] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        if (location && location.pathname) {
            setShowProfileMenu(false);
        }

        if (estaLogueado) {
            const userSession = JSON.parse(Cookies.get('user_session'))
            if (userSession && userSession.dataValues) {
                const { admin } = userSession.dataValues
                setIsAdmin(admin)
            } else {
                setIsAdmin(false)
            }
        }
    }, [location, dispatch, estaLogueado]);

    const handleMenuClick = () => {
        setShowProfileMenu(!showProfileMenu);
        
    };

    const count = useSelector(state => state.countCarrito)
    const handleLogOut = () => {
        setShowProfileMenu(!showProfileMenu);
        window.localStorage.removeItem("estaLogueado");
        window.localStorage.removeItem('carrito');
        window.localStorage.removeItem('count');
        // dispatch(userLoggedIn(logOut));
        dispatch(vaciarCarrito());
        setIsAdmin(false)
    }


    return (
        <div className={s.container}>
            <div className={s.menu}>
                <DrawerMenu />
            </div>

            <div className={s.logo} style={{ backgroundImage: `url(${logotipo})` }}></div>
            <Link to='/'>
                <div className={s.logocompleto} style={{ backgroundImage: `url(${logoCompleto})` }}></div>
            </Link>



            {!isAdmin && <div className={s.search}><SearchBar /></div>}

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '15%', alignItems: 'center' }}>
                {
                    isAdmin ? (
                        <div className={s.iniciar_sesion} onClick={handleMenuClick}>Administración</div>
                    ) : (
                        <div className={s.iniciar_sesion} onClick={handleMenuClick}>Mi cuenta</div>
                    )
                }

                {showProfileMenu && !estaLogueado && (
                    <div className={s.menuDesplegable}>
                          
                        <Link to="/login" className={s.link_menu} onClick={handleMenuClick}   >
                            <div className={s.link_text}><h4>Iniciar sesión</h4></div>
                        </Link>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                            <hr style={{ width: '30%' }} />
                            <span style={{ color: 'gray' }}>o</span>
                            <hr style={{ width: '30%' }} />
                        </div>
                        <Link to="/register" className={s.link_menu} onClick={handleMenuClick}>
                            <div className={s.link_text}><h4>Registrarse</h4></div>
                        </Link>
                    </div>
                )}

                {showProfileMenu && estaLogueado && !isAdmin && (
                    <div className={s.menuDesplegable}>

                        <Link to="/account" className={s.link_menu} onClick={handleMenuClick}>
                            <div className={s.link_text}><h4>Ver perfil</h4></div>
                        </Link>
                        <Link to="/historial-de-compra" className={s.link_menu} onClick={handleMenuClick}>
                            <div className={s.link_text}><h4>Historial de compras</h4></div>
                        </Link>
                        <Link to="/" className={s.link_menu} onClick={handleLogOut}>
                            <div className={s.link_text}><h4>Cerrar sesión</h4></div>
                        </Link>
                    </div>
                )}

                {showProfileMenu && isAdmin && (
                    <div className={s.menuDesplegable}
                    >
                        <Link to="/adminHome" className={s.link_menu} onClick={handleMenuClick}>
                            <div className={s.link_text}><h4>Inicio</h4></div>
                        </Link>
                        <Link to="/historialVentas" className={s.link_menu} onClick={handleMenuClick}>
                            <div className={s.link_text}><h4>Historial de ventas</h4></div>
                        </Link>
                        <Link to="/" className={s.link_menu} onClick={handleLogOut}>
                            <div className={s.link_text}><h4>Cerrar sesión</h4></div>
                        </Link>
                    </div>
                )}

                {!isAdmin && (
                    <div>
                        <Link to='/carrito' onClick={handleMenuClick}>
                            <div className={s.carrito}><MdOutlineShoppingCart size={33} /></div>
                        </Link>
                        <h4 className={count === 50 ? s.carritofull : s.carritoCount} >
                            {count}
                        </h4>
                    </div>
                )
                }
            </div>
        </div>
    )
}