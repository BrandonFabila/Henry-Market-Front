import Logo from "../../media/logoCompleto-blanco.png"
import Henry from "../../media/HenryLogo.png"
import styles from "../Footer/Footer.module.css"

const Footer = () => {
const logo = Logo
const henry = Henry
    return(
        <div style={{minHeight: "100%", position: "relative", height:"100%"}}>
            <div className={styles.container}>
                <div>
                    <img className={styles.logo} src={logo} />
                </div>
                <div className={styles.nombres}>
                <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/DanielCastillo97/"
                    target="_blank"
                    rel="noreferrer">
                        Daniel Castillo
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/BrandonFabila/"
                    target="_blank"
                    rel="noreferrer">
                        Brandon Fabila
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/jhojan-alfredo-cruz-portillo-0b09661b8/"
                    target="_blank"
                    rel="noreferrer">
                        Jhojan Cruz
                    </a>
                    
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/lautacorva/"
                    target="_blank"
                    rel="noreferrer">
                        Lautaro Corva
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/christian-ringler-139581235/"
                    target="_blank"
                    rel="noreferrer">
                        Chris Ringler
                    </a>
                    
                </div>
                <div >
                    <img className={styles.henry} src={henry} />
                </div>
            </div>
        </div>
    )
}

export default Footer