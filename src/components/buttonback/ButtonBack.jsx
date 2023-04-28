import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css'
export default function ButtonBack() {
const navigate = useNavigate();

function onClick() {
    navigate('/')
}

return (
    <button onClick={onClick} className={styles.button}>
        Volver al inicio
    </button>
)
}