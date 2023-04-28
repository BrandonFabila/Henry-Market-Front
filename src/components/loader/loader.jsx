import styles from "../../components/loader/Loader.module.css"

const Loader = () => {

    // Addeventlistener a window, se activa cuando todos los recursos de la página se han descargado
    window.addEventListener("load", function(){
        // Buscar el elemento con id "loader" y agregar o quitar la clase "loader2"
        // dependiendo de si la clase "loader2" ya estaba o no en el elemento
        document.getElementById("loader")?.classList.toggle("loader2")
    })

    return (
        <div class={styles.contenedor}>

            {/* animación de carga */}
            <div className={styles.loader} id="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>
    );
};

export default Loader;
