
  import * as Yup from 'yup';

  export const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('Nombre es requerido'),
    mail: Yup.string()
      .email('Ingrese un correo válido'),
    apellido: Yup.string()
      .min(3, 'El apellido debe tener al menos 3 caracteres')
      .required('Apellido es requerido'),
    cedula: Yup.string()
      .matches('^[0-9]*$', "Ingrese solo números")
      .min(10, 'La cédula debe tener al menos 10 caracteres')
      .max(10, 'La cédula no debe tener mas de 10 caracteres')
      .required('Cédula es requerida'),
    titulo: Yup.string()
      .min(3, 'El título debe tener al menos 3 caracteres'),
    cargo: Yup.string()
      .min(5, 'El cargo debe tener al menos 5 caracteres'),
    login: Yup.string()
      .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
      .required('El nombre de usuario es requerido'),
    password: Yup.string()
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
      .required('El constraseña de usuario es requerida'),
    direccion: Yup.string()
      .min(5, 'La dirección debe tener al menos 5 caracteres'),
    referencia: Yup.string()
      .min(5, 'La refencia debe tener al menos 5 caracteres')
  });