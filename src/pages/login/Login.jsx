import React from "react";
import s from './Login.module.css'
import FormLogin from "../../components/FormLogin/FormLogin";
import ButtonBack from "../../components/buttonback/ButtonBack"

const Login = () => {

  return (
    <div className={s.container}>

      <div className={s.buttonBack} >
            <ButtonBack />
      </div>
      
      <div className={s.formulario}>
        <FormLogin />
      </div>

      <p style={{ marginTop: '25px', color: 'gray' }}>Al continuar, aceptas las Condiciones de uso y el Aviso de privacidad de Henry Market.</p>
    </div>
  );
};

export default Login;
