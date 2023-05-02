const blankSpace = /^\s+$/ // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i // Email válido
const regexPassword = /^(?=.*?[a-z0-9])(?=.*?[a-z0-9]).{6,10}$/ // Password al menos un número
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
const regexTelefono = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}
      
    if (blankSpace.test(values.primer_nombre)) errors.primer_nombre = 'El nombre no puede tener un espacio en blanco'
    if (values.primer_nombre.length > 51) errors.primer_nombre = 'Los nombres no deberían sumar más de 50 caracteres'
    if (values.primer_nombre && !regexLetters.test(values.primer_nombre)) errors.primer_nombre = 'Tu nombre no puede contener número ni símbolos'
    if (values.primer_nombre.length === 1 && values.primer_nombre.length < 3) errors.primer_nombre = 'Los nombres no deben tener menos de 3 caracteres'; 


    if (blankSpace.test(values.primer_apellido)) errors.primer_apellido = 'El apellido no puede tener un espacio en blanco'
    if (values.primer_apellido.length > 51) errors.primer_apellido = 'Los apellidos no deberían sumar más de 50 caracteres'
    if (values.primer_apellido && !regexLetters.test(values.primer_apellido)) errors.primer_apellido = 'Tu apellido no puede contener número ni símbolos'
    if (values.primer_apellido.length === 1 && values.primer_apellido.length < 3) errors.primer_apellido = 'Los apellidos no deben tener menos de 3 caracteres';

   
    if (blankSpace.test(values.direccion)) errors.direccion = 'La dirección no puede ser un espacio en blanco'
    if(regexAddress.test(values.direccion)) errors.direccion = 'La dirección de tener números y letras'
    if (values.direccion.length > 101) errors.direccion = 'La dirección no debería sumar más de 100 caracteres'

    if (blankSpace.test(values.telefono)) errors.telefono = 'El número de teléfono no puede ser un espacio en blanco'
    if (values.telefono && values.telefono.length < 9) errors.telefono = 'El teléfono no debería contener menos de 9 caracteres'
    if (values.telefono.length > 25) errors.telefono = 'El telefono no debería sumar más de 25 caracteres'

    if (values.email && !regexEmail.test(values.email)) errors.email = 'Por favor ingresa un email válido'
    if (blankSpace.test(values.email)) errors.email = 'El email no puede ser un espacio en blanco'
    if (values.email.length > 30) errors.email = 'El email no debería contener más de 30 caracteres'
    



    

    return errors
}