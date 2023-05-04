export const date = () => {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1 ;
    let anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`
}