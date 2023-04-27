import { useNavigate } from 'react-router-dom';

export default function ButtonBack() {
const navigate = useNavigate();

function onClick() {
    navigate('/')
}

return (
    <button onClick={onClick} style={{ borderRadius: '0', boxShadow: '-3px 3px rgb(0, 128, 0)', position: 'absolute', left: '20px', top: '25px' }}>
        Volver al inicio
    </button>
)
}