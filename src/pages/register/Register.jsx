import FormRegister from "../../components/FormRegister/FormRegister"
import s from "./Register.module.css"

export default function Register() {

    return (
        <div className={s.container}>
            <p style={{marginBottom: '20px', color: 'gray'}}>Por favor completa la información sobre ti para registrar tu cuenta, <br /> y comenzar a aprovechar nuestras ofertas exclusivas!</p>
            <FormRegister/>
        </div>
    )
}