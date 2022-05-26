
  import * as yup from 'yup';
  
  export const validationSchema = yup.object({
    nombre: yup
      .string('Ingrese un nombre')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('Nombre es requerido'),
    mail: yup
      .string('Ingrese un correo')
      .email('Ingrese un correo válido'),
    apellido: yup
      .string('Ingrese el apellido')
      .min(3, 'El apellido debe tener al menos 3 caracteres')
      .required('Apellido es requerido'),
    cedula: yup
      .string('Ingrese la cédula')
      .matches('^[0-9]*$', "Ingrese solo números")
      .min(10, 'La cédula debe tener al menos 10 caracteres')
      .required('Cédula es requerida'),
    titulo: yup
      .string('Ingrese un título')
      .min(3, 'El título debe tener al menos 3 caracteres'),
    cargo: yup
      .string('Ingrese un cargo')
      .min(5, 'El cargo debe tener al menos 5 caracteres'),
    login: yup
      .string('Ingrese un nombre de usuario')
      .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
      .required('El nombre de usuario es requerido'),
    password: yup
      .string('Ingrese la  constraseña de usuario')
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
      .required('El constraseña de usuario es requerida'),
    direccion: yup
      .string('Ingrese dirección del usuario')
      .min(5, 'La dirección debe tener al menos 5 caracteres'),
    refrencia: yup
      .string('Ingrese la referencia del usuario')
      .min(5, 'La refencia debe tener al menos 5 caracteres')
  });