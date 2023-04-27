import { MdOutlineShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import SearchBar from "./SearchBar/SearchBar";
import logoCompleto from '../../media/logoCompleto-blanco.png'
import logotipo from '../../media/logotipo-blanco.png'


import s from './nav.module.css'

export default function NavBar() {
    

    return (
        <div className={s.container}>
            <div className={s.menu}><MdMenu size={35} /></div>

            <div className={s.logo} style={{backgroundImage: `url(${logotipo})`}}></div>
            <div className={s.logocompleto} style={{backgroundImage: `url(${logoCompleto})`}}></div>
            
            <div className={s.search}><SearchBar /></div>
            <div className={s.iniciar_sesion}>Iniciar sesión</div>
            <div className={s.carrito}><MdOutlineShoppingCart size={35} /></div>
        </div>
    )
}