import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { validationSchema } from '../../helpers/validacionRegistro';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForma } from '../../hooks/usaForma';
import moment from 'moment';
import { useDispatch } from 'react-redux';

export const RegistroScreen_old2 = () => {


  const ahora = moment().minutes(0).seconds(0);
  const tresMeses = moment().minutes(0).seconds(0).add(3, 'months');
  const dispatch = useDispatch();
  // const theme = createTheme();

  const [registroValores, registroManejaCambios] = useForma({
    // mail: `${tipo === -1 ? '' : usuario[0]?.mail}`,
    mail: "",
    nombre: "",
    apellido: "",
    cedula: "",
    titulo: "",
    cargo: "",
    login: "",
    fechaInicio: ahora.toDate(),
    fechaPass: tresMeses.toDate(),
    fechaFin: ahora.toDate(),
    password: "12345",
    activo: 1,
    sexo: "M",
    direccion: "",
    referencia: ""
  })

  // const formik = useFormik({
  //   initialValues: registroValores,
  //   validationSchema: validationSchema,
  //    onSubmit: values => {
  //     // handleFormSubmit();
  //   },
  // });

  

  return (
  <div>
    <h1>Signup</h1>
    <Formik
    initialValues={registroValores}
      // initialValues={{
      //   nombre: '',
      //   apellido: '',
      //   mail: '',
      // }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched, handleBlur, handleChange }) => (
        <Form>
          {/* <Field name="nombre"/>
          {errors.nombre && touched.nombre ? (
            <div>{errors.nombre}</div>
          ) : null} */}


          <TextField
            autoComplete="off"
            name="nombre"            
            fullWidth
            id="nombre"
            label="Nombre"
            autoFocus
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ style: { textTransform: 'capitalize' } }}
            value={registroValores.nombre}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />


          <Field name="apellido" />
          {errors.apellido && touched.apellido ? (
            <div>{errors.apellido}</div>
          ) : null}
          <Field name="mail" type="email" />
          {errors.mail && touched.mail ? <div>{errors.mail}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
  )
};