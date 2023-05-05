// const regexPassword = /^(?=.*?[a-z0-9])(?=.*?[a-z0-9]).{6,10}$/ // Password al menos un número
const blankSpace = /^\s+$/ // Espacio en blanco

export default function validations(values) {
    const errors = {}

    if (values.password.length < 8) errors.password = 'Minimo 8 caracteres'
    if (values.password.length > 20) errors.password = 'Maximo 20 caracteres'    
    if (!values.password) errors.password = 'Campo Requerido'
    if (!/(?=.*\d).+/.test(values.password)) errors.password = 'Inserta al menos un número';
    if (blankSpace.test(values.password)) errors.password = 'No puede estar vacio'


    if (!values.confirmPassword) errors.confirmPassword = 'Debes confirmar la contraseña'
    if ( values.password !== values.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden'
     
    return errors
}