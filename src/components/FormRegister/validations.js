const blankSpace = /^\s+$/ // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i // Email válido
const regexPassword = /^(?=.*?\d)[a-zA-Z0-9]{6,10}$/; // Password al menos un número
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
const regexTelefono = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}
      
    if(!values.primer_nombre) errors.primer_nombre = 'Campo Requerido'
    if (blankSpace.test(values.primer_nombre)) errors.primer_nombre = 'No puede ser un espacio en blanco'
    if (values.primer_nombre.length > 51) errors.primer_nombre = 'Máximo 50 caracteres'
    if (values.primer_nombre && !regexLetters.test(values.primer_nombre)) errors.primer_nombre = 'Los números ó símbolos son invalidos'
    if (values.primer_nombre.length === 1 && values.primer_nombre.length < 3) errors.primer_nombre = 'Inserta minimo 3 caracteres'; 

    if(!values.primer_apellido) errors.primer_apellido = 'Campo Requerido'
    if (blankSpace.test(values.primer_apellido)) errors.primer_apellido =  'No puede ser un espacio en blanco'
    if (values.primer_apellido.length > 51) errors.primer_apellido = 'Máximo 50 caracteres';
    if (values.primer_apellido && !regexLetters.test(values.primer_apellido)) errors.primer_apellido = 'Los números ó símbolos son invalidos'
    if (values.primer_apellido.length === 1 && values.primer_apellido.length < 3) errors.primer_apellido = 'Inserta minimo 3 caracteres'; 


    if(!values.direccion) errors.direccion = 'Campo Requerido'
    if (blankSpace.test(values.direccion)) errors.direccion = 'No puede ser un espacio en blanco'
    if(regexAddress.test(values.direccion)) errors.direccion = 'Números y letras'
    if (values.direccion.length > 101) errors.direccion = 'Máximo 100 caracteres'
    if (values.direccion.length < 15) errors.direccion = 'Mínimo 15 caracteres'


    if(!values.telefono) errors.telefono = 'Campo Requerido'
    if (blankSpace.test(values.telefono)) errors.telefono = 'No puede ser un espacio en blanco'
    if (values.telefono && values.telefono.length < 9) errors.telefono = 'Mínimo 9 caracteres'
    if(!regexTelefono.test(values.telefono)) errors.telefono = "Debe contener solo numeros"
    if (values.telefono.length > 25) errors.telefono = 'Máximo 25 caracteres'

    if(!values.email) errors.email = 'Campo Requerido'
    if (values.email && !regexEmail.test(values.email)) errors.email = 'Por favor ingresa un email válido'
    if (blankSpace.test(values.email)) errors.email = 'No puede ser un espacio en blanco'
    if (values.email.length > 30) errors.email = 'Máximo 30 caracteres'
    
    if (values.password.length < 8) errors.password = 'Mínimo 8 caracteres'
    if (values.password.length > 20) errors.password = 'Máximo 20 caracteres'
    if (!regexPassword.test(values.password)) errors.password = 'Debe contener al menos un número'
    if (!values.password) errors.password = 'Campo Requerido'


    return errors
}