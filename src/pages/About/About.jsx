import React from "react";

//Import imagenes
import Logo from "../../media/logoCompleto-negro.png";

//Import Estilos
import styles from "./About.module.css";

import brandon from "../../media/brandon.jpg"
import lautaro from "../../media/lautaro.jpg"
import daniel from "../../media/daniel.png"
import chris from "../../media/chris.png"
import linkedin from "../../media/linkedin.png"
const logo = Logo;

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
      </div>
      <img className={styles.img} src={logo} alt="logo"/>
      <div className={styles.parrafos}>
        <p>
        Es una plataforma de e-commerce que está aquí para ayudarte a llevar tu negocio al siguiente nivel.
        Ofrecemos una plantilla personalizable y fácil de usar que permite a las empresas vender sus productos y servicios en línea
        y llegar a nuevos mercados.
          <br/>
          <br/>
          En HENRY MARKET, entendemos la importancia de brindar una experiencia de usuario
          satisfactoria para nuestros compradores y vendedores. Por eso, nos comprometemos
          a proporcionar herramientas de administración y gestión de inventarios para que
          los usuarios administradores de la empresa puedan tener un control total sobre los productos
          y servicios que se ofrecen en la plataforma. También ofrecemos paneles para los compradores,
          lo que les permite encontrar y comprar productos y servicios de manera fácil y conveniente.
          <br/>
          <br/>
          Pero HENRY MARKET es más que una simple plantilla de e-commerce. Nos preocupamos por
          el éxito de tu negocio, y estamos aquí para ayudarte en cada paso del camino. Nuestro equipo
          de soporte está disponible para brindarte asistencia en cualquier momento, y nos esforzamos
          por garantizar que tu experiencia en nuestra plataforma sea lo más sencilla y sin problemas posible.
          <br/>
          <br/>
          En HENRY MARKET, nos apasiona ayudar a las pequeñas y medianas empresas a alcanzar su máximo potencial.
          Creemos que todas las empresas merecen la oportunidad de crecer y tener éxito en un mercado cada vez 
          más competitivo, y estamos comprometidos a brindar la mejor plataforma posible para hacerlo.
          <br/>
          <br/>
          Si estás buscando expandir tu negocio y llegar a nuevos mercados, ¡no dudes en unirte a HENRY MARKET!
        </p>
        <p >
          <br />
          <br />
          <br />
          <h2 className={styles.titulo2}> Nuestro equipo</h2>
          <div className={styles.nombres}>
                    <div>
                      <img src={daniel} className={styles.profiles} alt="daniel" />
                        <div className={styles.name}>Daniel Castillo</div>
                        <div className={styles.puesto}>Desarrollador web</div>
                        <a className={styles.linkedinButton} href="https://www.linkedin.com/in/DanielCastillo97/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="LinkedIn" className={styles.linkedinLogo} />

                        </a>
                    </div>
                    <div>
                      <img src={brandon} className={styles.profiles} alt="brandon" />
                        <div className={styles.name}>Brandon Fabila</div>
                        <div className={styles.puesto}>Desarrollador web</div>
                        <a className={styles.linkedinButton} href="https://www.linkedin.com/in/BrandonFabila/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="LinkedIn" className={styles.linkedinLogo} />

                        </a>
                    </div>
                    <div>
                      <img src={lautaro} className={styles.profiles} alt="lautaro" />
                        <div className={styles.name}>Lautaro Corva</div>
                        <div className={styles.puesto}>Desarrollador web</div>
                        <a href="https://www.linkedin.com/in/lautacorva/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="LinkedIn" className={styles.linkedinLogo} />
</a>
                    </div>
                    <div>
                      <img src={chris} className={styles.profiles} alt="chris" />
                        <div className={styles.name}>Chris Ringler</div>
                        <div className={styles.puesto}>Desarrollador web</div>
                        <a  href="https://www.linkedin.com/in/christian-ringler-139581235/" target="_blank" rel="noreferrer">
                         <img src={linkedin} alt="LinkedIn" className={styles.linkedinLogo} />
                         </a>
                    </div>
                    
                </div>
        </p>
      </div>
    </div>
  );
};

export default About;

//https://www.linkedin.com/in/BrandonFabila/
//https://www.linkedin.com/in/christian-ringler-139581235/
//https://www.linkedin.com/in/lautacorva/