import * as Yup from 'yup';

export const validacionCanton = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('Nombre es obligatorio'),
    numero: Yup.string()
        .required('El número secuencial es obligatorio'),
    logitud: Yup.string()
        .matches('^-?[0-9]*\.?[0-9]*$', "Ingrese una expresión correcta"),
    latitud: Yup.string()
        .matches('^-?[0-9]*\.?[0-9]*$', "Ingrese una expresión correcta")
});