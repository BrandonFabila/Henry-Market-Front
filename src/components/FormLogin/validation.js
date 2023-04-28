export default function validation(values) {
    const errors = {}

    if(!values.email) errors.email = 'Field required'
    if(!values.password) errors.password = 'Field required'

    return errors
}