
import * as Yup from 'yup';

export const validacionFinca = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('Nombre es obligatorio'),
  mail: Yup.string()
    .email('Ingrese un correo válido'),
  ruc: Yup.string()
    .matches('^[0-9]*$', "Ingrese solo números")
    .min(10, 'El RUC debe tener al menos 10 caracteres')
    .max(13, 'El RUC no debe tener mas de 13 caracteres')
    .required('RUC es obligatorio'),
  direccion: Yup.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  referencia: Yup.string()
    .min(5, 'La refencia debe tener al menos 5 caracteres'),
  telefono: Yup.string()
    // .matches('^[0-9]*$', "Ingrese solo números")
    .min(10, 'El teléfono debe tener al menos 10 caracteres'),
  comunidadid: Yup.string()
    .required('Comunidad es obligatorio'),
});