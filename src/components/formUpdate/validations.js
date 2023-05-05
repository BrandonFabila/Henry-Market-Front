const blankSpace = /^\s+$/ // Espacio en blanco
const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
// const regexTelefono = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}
   
    if (blankSpace.test(values.direccion)) errors.direccion = 'La dirección no puede ser un espacio en blanco'
    if(regexAddress.test(values.direccion)) errors.direccion = 'La dirección debe contener números y letras'
    if (values.direccion.length > 101) errors.direccion = 'Maximo 100 caracteres'
    if ( values.direccion && values.direccion.length < 15) errors.direccion = 'Minimo 15 caracteres'

    if (blankSpace.test(values.telefono)) errors.telefono = 'El número de teléfono no puede ser un espacio en blanco'
    if (values.telefono && values.telefono.length < 9) errors.telefono = 'Minimo 10 digitos'
    if (values.telefono.length > 25) errors.telefono = 'El telefono no debería sumar más de 25 caracteres'

    return errors
}