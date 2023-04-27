import { MdOutlineShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'

import SearchBar from "./SearchBar/SearchBar";
import logoCompleto from '../../media/logoCompleto-blanco.png'
import logotipo from '../../media/logotipo-blanco.png'


import s from './nav.module.css'
import { useState, useEffect } from "react";

export default function NavBar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const estaLogueado = window.localStorage.getItem("estaLogueado");

    const [showProfileMenu, setShowProfileMenu] = useState(false);


    useEffect(() => {
        setShowProfileMenu(false)
    }, [location.pathname])

    const handleMenuClick = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogOut = () => {
        // window.localStorage.removeItem("estaLogueado");
        // window.localStorage.removeItem('carrito');
        // window.localStorage.removeItem('count');
        // dispatch(userLoggedIn(logOut));
    }


    return (
        <div className={s.container}>
            <div className={s.menu}><MdMenu size={35} /></div>

            <div className={s.logo} style={{ backgroundImage: `url(${logotipo})` }}></div>
            <div className={s.logocompleto} style={{ backgroundImage: `url(${logoCompleto})` }}></div>

            <NavLink style={{textDecoration: 'none', color: 'white', fontWeight: '500', fontSize: '17px'}} className={s.hmarket}>
                ¿Qué es hMarket?
            </NavLink>

            <div className={s.search}><SearchBar /></div>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '15%', alignItems: 'center' }}>
                <div className={s.iniciar_sesion} onClick={handleMenuClick}>Mi cuenta</div>
                {showProfileMenu && (
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