import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import DrawerMenu from '../DrawerMenu/DrawerMenu'
// import { useDispatch } from 'react-redux'

import SearchBar from "./SearchBar/SearchBar";
import logoCompleto from '../../media/logoCompleto-blanco.png'
import logotipo from '../../media/logotipo-blanco.png'


import s from './nav.module.css'
import { useState, useEffect } from "react";

export default function NavBar() {
    const location = useLocation()
    // const dispatch = useDispatch()
    const estaLogueado = window.localStorage.getItem("estaLogueado");

    const [showProfileMenu, setShowProfileMenu] = useState(false);


    useEffect(() => {
        if (location && location.pathname) {
            setShowProfileMenu(false);
        }
    }, [location]);

    const handleMenuClick = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogOut = () => {
        setShowProfileMenu(!showProfileMenu);
        // window.localStorage.removeItem("estaLogueado");
        // window.localStorage.removeItem('carrito');
        // window.localStorage.removeItem('count');
        // dispatch(userLoggedIn(logOut));
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

            <Link to="/about" style={{textDecoration: 'none', color: 'white', fontWeight: '500', fontSize: '17px'}} className={s.hmarket}>
                ¿Qué es hMarket?
            </Link>

            <div className={s.search}><SearchBar /></div>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '15%', alignItems: 'center' }}>
                <div className={s.iniciar_sesion} onClick={handleMenuClick}>Mi cuenta</div>
                {showProfileMenu && (
                    <div className={s.menuDesplegable}>

                        <Link to="/log-in" className={s.link_menu} onClick={handleMenuClick}>
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

                {showProfileMenu && estaLogueado && (
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

                <div className={s.carrito}><MdOutlineShoppingCart size={33} /></div>
            </div>
        </div>
    )
}