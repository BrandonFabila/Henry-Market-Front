import { useHistory } from 'react-router-dom';


export default function ButtonBack() {
    const history = useHistory()

    function onClick() {
        history.push('/')
    }

    return (
        <button onClick={onClick} style={{ borderRadius: '0', boxShadow: '-3px 3px rgb(0, 128, 0)', position: 'absolute', left: '20px', top: '25px' }}>
            Volver al inicio
        </button>
    )
}