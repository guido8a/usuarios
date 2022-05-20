import React, { useEffect, useState } from 'react';
import { useForma } from '../../hooks/usaForma';
// import './registro.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { iniciaRegistro } from '../../acciones/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../ui/Navbar';

import { useFormik } from 'formik';
import * as yup from 'yup';


export const RegistroScreen = () => {


  const dispatch = useDispatch();

  const theme = createTheme();

  //usaForma para el registro
  const [registroValores, registroManejaCambios] = useForma({
    nombre: "",
    apellido: "",
    cedula: "",
    titulo: "",
    cargo: "",
    mail: "",
    login: "",
    password: '123',
    activo: '1',
    sexo: 'M',
    direccion: '',
    referencia: ''
  })

  const tiposSexo = [
    {
      value: 'M',
      label: "Masculino"
    },
    {
      value: 'F',
      label: 'Femenino'
    },
  ]

  const tiposActivo = [
    {
      value: '1',
      label: "Activo"
    },
    {
      value: '0',
      label: 'No activo'
    },
  ]

  const tamanoNombreMinimo = 5

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    if (registroValores.nombre < tamanoNombreMinimo) {
      setErrorMessage("El nombre no debe tener menos de 5 caracteres");
    }

  }, [registroValores.nombre])

  useEffect(() => {
    if (registroValores.nombre.length >= tamanoNombreMinimo && errorMessage) {
      setErrorMessage("");
    }
  }, [registroValores.nombre, errorMessage]);

  const validationSchema = yup.object({
    nombre: yup
      .string('Ingrese un nombre')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('Nombre es requerido'),
    mail: yup
      .string('Ingrese un correo')
      .email('Ingrese un correo válido')
  });
  
  const formik = useFormik({
    initialValues: {
      mail: registroValores.mail,
      nombre: registroValores.nombre
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // handleRegistro();
      handleFormSubmit();
    },
  });

  const handleRegistro = (e) => {
    e.preventDefault()
    dispatch(iniciaRegistro(registroValores))
  }

  const handleFormSubmit = () => {
    var data = {
      cedula: "0601983865",
      nombre: formik.values.nombre,                    
      apellido: "G",
      fechaInicio: "2022-05-14T00:00:00Z",
      fechaFin: "0001-01-01T00:00:00Z",
      titulo: "Ing",
      cargo: "Aministrador",
      mail: formik.values.mail,
      login: "admin",
      password: "202cb962ac59075b964b07152d234b70",
      activo: 1,
      fechaPass: "00:00:00",
      sexo: "M",
      direccion: "",
      referencia: ""            
    }
    
    // dispatch(iniciaRegistro(JSON.stringify(data, null, 2)))
    dispatch(iniciaRegistro(data))
    // alert(JSON.stringify(data, null, 2));
  }


  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro de usuarios
            </Typography>
            {/* <Box component="form" noValidate onSubmit={handleRegistro} sx={{ mt: 3 }}> */}
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
                    inputProps={{style: {textTransform: 'capitalize'}}}                                          
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
                    value={registroValores.apellido}
                    onChange={registroManejaCambios}
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
                    value={registroValores.cedula}
                    onChange={registroManejaCambios}
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
                    value={registroValores.titulo}
                    onChange={registroManejaCambios}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    name="cargo"
                    label="Cargo"
                    id="cargo"
                    autoComplete="off"
                    value={registroValores.cargo}
                    onChange={registroManejaCambios}
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
                    value={registroValores.login}
                    onChange={registroManejaCambios}
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
                    value={registroValores.password}
                    onChange={registroManejaCambios}
                  />
                </Grid>

                <Grid item xs={12} sm={7}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Dirección"
                    multiline
                    minRows={2}
                    maxRows={3}
                    value={registroValores.direccion}
                    onChange={registroManejaCambios}
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Referencia"
                    multiline
                    minRows={2}
                    maxRows={3}
                    value={registroValores.referencia}
                    onChange={registroManejaCambios}
                  />
                </Grid>

                <Grid item xs={12} sm={7}>
                  <TextField
                    id="activo"
                    select
                    name='activo'
                    label="Estado"
                    value={registroValores.activo}
                    onChange={registroManejaCambios}
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
                    value={registroValores.sexo}
                    onChange={registroManejaCambios}
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
    //     <div className="col-md-6 login-form-2">
    //     <h3>Registro</h3>
    //     <form onSubmit={handleRegistro}>
    //         <div className="form-group">
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Nombre"
    //                 name="reg_Nombre"
    //                 value={reg_Nombre}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>
    //         <div className="form-group">
    //             <input
    //                 type="mail"
    //                 className="form-control"
    //                 placeholder="Correo"
    //                 name="reg_Mail"
    //                 value={reg_Mail}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>
    //         <div className="form-group">
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Contraseña"
    //                 name="reg_Pass1"
    //                 value={reg_Pass1}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>

    //         <div className="form-group">
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Repita la contraseña"
    //                 name="reg_Pass2"
    //                 value={reg_Pass2}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>

    //         <div className="form-group">
    //             <input
    //                 type="submit"
    //                 className="btnSubmit"
    //                 value="Crear cuenta" />
    //         </div>
    //     </form>
    // </div>
  )

}