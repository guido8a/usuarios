
  import * as Yup from 'yup';

  export const validacionPerfil = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('Nombre es obligatorio'),
    descripcion: Yup.string()
      .min(5, 'La cédula debe tener al menos 5 caracteres')
      .max(250, 'La cédula no debe tener más de 250 caracteres')
      .required('La descripción es obligatoria'),
    codigo: Yup.string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(5, 'El título no debe tener al más de 3 caracteres')
  });