import React from "react";

//Import imagenes
import Logo from "../../media/logoCompleto-negro.png";

//Import Estilos
import styles from "./About.module.css";

const logo = Logo;

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <h1>¿Qué es HENRY MARKET?</h1>
      </div>
      <img className={styles.img} src={logo} alt="logo"/>
      <div className={styles.parrafos}>
        <p>
        Bienvenido/a, HENRY MARKET es una plataforma de e-commerce que está aquí para ayudarte a llevar tu negocio al siguiente nivel.
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
      </div>
    </div>
  );
};

export default About;