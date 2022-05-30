import React, { useEffect, useState } from 'react';
import { useForma } from '../../hooks/usaForma';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { iniciaRegistro } from '../../acciones/auth';
import moment from 'moment';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../ui/Navbar';

import { useFormik } from 'formik';
import { validationSchema } from '../../helpers/validacionRegistro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

export const RegistroScreen = () => {

  const ahora = moment().minutes(0).seconds(0);
  const tresMeses = moment().minutes(0).seconds(0).add(3, 'months')
  const dispatch = useDispatch();
  const theme = createTheme();

  //usaForma para el registro
  // const [registroValores, registroManejaCambios] = useForma({
  //   nombre: "",
  //   apellido: "",
  //   cedula: "",
  //   titulo: "",
  //   cargo: "",
  //   mail: "",
  //   login: "",
  //   password: '12345',
  //   activo: 1,
  //   sexo: 'M',
  //   direccion: '',
  //   referencia: ''
  // })

  const tiposSexo = [{value: 'M', label: "Masculino"}, {value: 'F', label: 'Femenino' },]
  const tiposActivo = [{value: 1, label: "Activo"}, {value: 0, label: 'No activo'},]

  const formik = useFormik({
    initialValues: {
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
    },

    validationSchema: validationSchema,
    onSubmit: values => {
      // handleRegistro();
      handleFormSubmit();
    },
  });

  // const handleRegistro = (e) => {
  //   e.preventDefault()
  //   dispatch(iniciaRegistro(registroValores))
  // }

  const handleFormSubmit = () => {
    var data = {
      cedula: formik.values.cedula,
      nombre: formik.values.nombre,
      mail: formik.values.mail,
      apellido: formik.values.apellido,
      fechaInicio: formik.values.fechaInicio,
      fechaFin: formik.values.fechaFin,
      titulo: formik.values.titulo,
      cargo: formik.values.cargo,
      login: formik.values.login,
      password: formik.values.password,
      activo: formik.values.activo,
      fechaPass: formik.values.fechaPass,
      sexo: formik.values.sexo,
      direccion: formik.values.direccion,
      referencia: formik.values.referencia
    }

    // dispatch(iniciaRegistro(JSON.stringify(data, null, 2)))
    dispatch(iniciaRegistro(data))
    // alert(JSON.stringify(data, null, 2));
    formik.resetForm();
  }

  return (
    <div>
      {/* <Navbar /> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Registro de usuarios
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    autoFocus
                    variant="outlined"
                    // value={registroValores.nombre}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    name="apellido"
                    autoComplete="off"
                    // value={registroValores.apellido}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.apellido}
                    error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                    helperText={formik.touched.apellido && formik.errors.apellido}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cedula"
                    label="Cédula"
                    name="cedula"
                    autoComplete="off"
                    // value={registroValores.cedula}
                    // onChange={registroManejaCambios}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cedula}
                    error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                    helperText={formik.touched.cedula && formik.errors.cedula}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="mail"
                    label="Email"
                    name="mail"
                    autoComplete="off"
                    // value={registroValores.mail}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mail}
                    error={formik.touched.mail && Boolean(formik.errors.mail)}
                    helperText={formik.touched.mail && formik.errors.mail}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="titulo"
                    label="Título"
                    id="titulo"
                    autoComplete="off"
                    // value={registroValores.titulo}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.titulo}
                    error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                    helperText={formik.touched.titulo && formik.errors.titulo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    name="cargo"
                    label="Cargo"
                    id="cargo"
                    autoComplete="off"
                    // value={registroValores.cargo}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cargo}
                    error={formik.touched.cargo && Boolean(formik.errors.cargo)}
                    helperText={formik.touched.cargo && formik.errors.cargo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="login"
                    label="Usuario"
                    id="login"
                    autoComplete="off"
                    // value={registroValores.login}
                    // onChange={registroManejaCambios}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    helperText={formik.touched.login && formik.errors.login}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    // disabled
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    // value={registroValores.password}
                    // onChange={registroManejaCambios}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={7}>
                  <TextField
                    id="direccion"
                    label="Dirección"
                    name='direccion'
                    multiline
                    minRows={2}
                    maxRows={3}
                    // value={registroValores.direccion}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.direccion}
                    error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                    helperText={formik.touched.direccion && formik.errors.direccion}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <TextField
                    id="referencia"
                    label="Referencia"
                    name='referencia'
                    multiline
                    minRows={2}
                    maxRows={3}
                    // value={registroValores.referencia}
                    // onChange={registroManejaCambios}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referencia}
                    error={formik.touched.referencia && Boolean(formik.errors.referencia)}
                    helperText={formik.touched.referencia && formik.errors.referencia}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={7}>
                  <TextField
                    id="activo"
                    select
                    name='activo'
                    label="Estado"
                    // value={registroValores.activo}
                    value={formik.values.activo}
                    onChange={formik.handleChange}
                    // onChange={registroManejaCambios}
                    helperText="Seleccione el estado del usuario"
                  >
                    {tiposActivo.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={5}>
                  <TextField
                    id="sexo"
                    name='sexo'
                    select
                    label="Sexo"
                    // value={registroValores.sexo}
                    // onChange={registroManejaCambios}
                    value={formik.values.sexo}
                    onChange={formik.handleChange}
                  >
                    {tiposSexo.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button
                type="submit"
                className='btnSubmit'
                color='success'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<FontAwesomeIcon icon={faSave} />}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}