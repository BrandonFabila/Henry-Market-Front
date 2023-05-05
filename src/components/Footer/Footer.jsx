import Logo from "../../media/logoCompleto-blanco.png"
import Henry from "../../media/HenryLogo.png"
import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {
    const logo = Logo
    const henry = Henry
    return(
        <footer className={styles.footer}>
            <div>
                <img className={styles.logo} src={logo} alt='HenryMarketLogo' />
            </div>
            <div className={styles.hm}>
                <Link to="/about" style={{textDecoration: 'none', color: 'white', fontWeight: '500', fontSize: '17px'}} >
                    <div>
                        ¿Qué es hMarket?
                    </div>
                </Link>
            </div>
            <div>
                <img className={styles.henry} src={henry} alt="HenryLogo" />
            </div>
        </footer>
    )
}

export default Footer
