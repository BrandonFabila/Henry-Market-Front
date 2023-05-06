import React from "react";
//Estilos
import s from "./CreateProduct.module.css"


const CreateProduct = () => {
    return (
        <div className={s.contenedor}>
            <div className={s.titulo}>
                <h1>Publica un nuevo <span style={{ color: 'var(--green-color)' }}>producto</span> ahora</h1>
            </div>
            <div className={s.aux}>
                <div style={{ padding: '10px', width: '50%' }}>
                </div>
            </div>
        </div>
    )

}

export default CreateProduct