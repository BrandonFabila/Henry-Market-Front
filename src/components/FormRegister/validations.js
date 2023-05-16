const blankSpace = /^\s+$/ // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i // Email válido
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
const regexTelefono = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}
      
    if(!values.primer_nombre) errors.primer_nombre = 'Campo Requerido'
    if (blankSpace.test(values.primer_nombre)) errors.primer_nombre = 'No puede ser un espacio en blanco'
    if (values.primer_nombre && values.primer_nombre.length > 51) errors.primer_nombre = 'Máximo 50 caracteres'
    if (values.primer_nombre && !regexLetters.test(values.primer_nombre)) errors.primer_nombre = 'Los números ó símbolos son invalidos'
    if (values.primer_nombre && values.primer_nombre.length === 1 && values.primer_nombre.length < 3) errors.primer_nombre = 'Inserta minimo 3 caracteres'; 

    if(!values.primer_apellido) errors.primer_apellido = 'Campo Requerido'
    if (blankSpace.test(values.primer_apellido)) errors.primer_apellido =  'No puede ser un espacio en blanco'
    if (values.primer_apellido && values.primer_apellido.length > 51) errors.primer_apellido = 'Máximo 50 caracteres';
    if (values.primer_apellido && !regexLetters.test(values.primer_apellido)) errors.primer_apellido = 'Los números ó símbolos son invalidos'
    if (values.primer_apellido && values.primer_apellido.length === 1 && values.primer_apellido.length < 3) errors.primer_apellido = 'Inserta minimo 3 caracteres'; 


    if (blankSpace.test(values.direccion)) errors.direccion = 'No puede ser un espacio en blanco'
    if(regexAddress.test(values.direccion)) errors.direccion = 'Números y letras'
    if (values.direccion && values.direccion.length > 101) errors.direccion = 'Máximo 100 caracteres'
    if (values.direccion && values.direccion.length < 15) errors.direccion = 'Mínimo 15 caracteres'
    if(!values.direccion) errors.direccion = 'Campo Requerido'


    if (blankSpace.test(values.telefono)) errors.telefono = 'No puede ser un espacio en blanco'
    if (values.telefono && values.telefono.length < 10) errors.telefono = 'Mínimo 10 digitos'
    if(!regexTelefono.test(values.telefono)) errors.telefono = "Debe contener solo números"
    if(!values.telefono) errors.telefono = 'Campo Requerido'
    if (values.telefono && values.telefono.length > 20) errors.telefono = 'Máximo 20 digitos'

    if(!values.email) errors.email = 'Campo Requerido'
    if (values.email && !regexEmail.test(values.email)) errors.email = 'Por favor ingresa un email válido'
    if (blankSpace.test(values.email)) errors.email = 'No puede ser un espacio en blanco'
    if (values.email && values.email.length > 30) errors.email = 'Máximo 30 caracteres'
    
    if (values.password && values.password.length < 8) errors.password = 'Inserta minimo 8 caracteres'
    if (values.password && values.password.length > 20) errors.password = 'Inserta maximo 20 caracteres'    
    if (!/(?=.*\d).+/.test(values.password)) errors.password = 'Ingresa al menos un número';
    if (!values.password) errors.password = 'Campo Requerido'
    if (blankSpace.test(values.password)) errors.password = 'No puede ser un espacio en blanco'

    
    if (values.password && values.passwordconfirm && values.password !== values.passwordconfirm) errors.passwordconfirm = 'Las contraseñas no coinciden'
    if (!values.passwordconfirm) errors.passwordconfirm = 'Por favor confirma tu contraseña'
    if (blankSpace.test(values.passwordconfirm)) errors.passwordconfirm = 'No puede ser un espacio en blanco'



    return errors
}