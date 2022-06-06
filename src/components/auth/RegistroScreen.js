// import {
//   Card,
//   CardContent,
//   // TextField,
// } from "@mui/material";

import { withFormik } from "formik";
import { validationSchema } from "../../helpers/validacionRegistro";

import React from 'react';
// import { useForma } from '../../hooks/usaForma';
// import { useDispatch, useSelector } from 'react-redux';
import { iniciaRegistro } from '../../acciones/auth';
import moment from 'moment';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux'

const tiposSexo = [{ value: 'M', label: "Masculino" }, { value: 'F', label: 'Femenino' },]
const tiposActivo = [{ value: 1, label: "Activo" }, { value: 0, label: 'No activo' },]


const form = props => {

  const theme = createTheme();

  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    tipo
  } = props;

  return (
    <div >
      {/* <form onSubmit={handleSubmit}> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
              {/* <Card >
          <CardContent> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nombre"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.nombre ? errors.nombre : ""}
                    error={touched.nombre && Boolean(errors.nombre)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="apellido"
                    label="Apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.apellido ? errors.apellido : ""}
                    error={touched.apellido && Boolean(errors.apellido)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="cedula"
                    label="Cédula"
                    value={values.cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.cedula ? errors.cedula : ""}
                    error={touched.cedula && Boolean(errors.cedula)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="mail"
                    label="Email"
                    value={values.mail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.mail ? errors.mail : ""}
                    error={touched.mail && Boolean(errors.mail)}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="titulo"
                    label="Título"
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.titulo ? errors.titulo : ""}
                    error={touched.titulo && Boolean(errors.titulo)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="cargo"
                    label="Cargo"
                    value={values.cargo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.cargo ? errors.cargo : ""}
                    error={touched.cargo && Boolean(errors.cargo)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="login"
                    label="Usuario"
                    value={values.login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.login ? errors.login : ""}
                    error={touched.login && Boolean(errors.login)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="password"
                    label="Password"
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
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
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.direccion}
                    error={touched.direccion && Boolean(errors.direccion)}
                    helperText={touched.direccion ? errors.direccion : ''}
                    margin="dense"
                    variant="outlined"
                    fullWidth
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
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.referencia}
                    error={touched.referencia && Boolean(errors.referencia)}
                    helperText={touched.referencia ? errors.referencia : ''}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    id="activo"
                    select
                    name='activo'
                    label="Estado"
                    value={values.activo}
                    onChange={handleChange}
                    helperText="Seleccione el estado del usuario"
                    margin="dense"
                    variant="outlined"
                    fullWidth
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
                    value={values.sexo}
                    onChange={handleChange}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  >
                    {tiposSexo.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button type="submit" color='success' fullWidth variant="contained"
                sx={{ mt: 3, mb: 2 }} startIcon={<FontAwesomeIcon icon={faSave} />}
              >
                {tipo === -1 ? 'Guardar' : 'Actualizar'}
              </Button>
              {/* </CardContent>
               </Card> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* </form> */}
    </div >
  );
};

const Registro = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initialValues ? props.initialValues[0]?.id : null,
    mail: props.initialValues ? props.initialValues[0]?.mail : "",
    nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    apellido: props.initialValues ? props.initialValues[0]?.apellido : "",
    cedula: props.initialValues ? props.initialValues[0]?.cedula : "",
    titulo: props.initialValues ? props.initialValues[0]?.titulo : "",
    cargo: props.initialValues ? props.initialValues[0]?.cargo : "",
    login: props.initialValues ? props.initialValues[0]?.login : "",
    fechaInicio: props.initialValues ? props.initialValues[0]?.fechaInicio : moment().minutes(0).seconds(0).toDate(),
    fechaPass: props.initialValues ? props.initialValues[0]?.fechaPass : moment().minutes(0).seconds(0).add(3, 'months').toDate(),
    fechaFin: props.initialValues ? props.initialValues[0]?.fechaFin : moment().minutes(0).seconds(0).toDate(),
    password: props.initialValues ? props.initialValues[0]?.password : "",
    activo: props.initialValues ? props.initialValues[0]?.activo : 1,
    sexo: props.initialValues ? props.initialValues[0]?.sexo : "M",
    direccion: props.initialValues ? props.initialValues[0]?.direccion : "",
    referencia: props.initialValues ? props.initialValues[0]?.referencia : ""
  }),

  // mapPropsToValues: ({
  //   mail,
  // }) => {
  //   return {
  //     mail: mail || "",
  //   };
  // },

  validationSchema: validationSchema,

  handleSubmit: (values, { props, setSubmitting }) => {
    // props.dispatch(iniciaRegistro(values));

    props.registroDeUsuario(values, props.tipo);
    setSubmitting(false);
  }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  initialValues: state.ui.usuario,
  tipo: state.ui.tipo
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDeUsuario: (values, tipo) => {
    dispatch(iniciaRegistro(values, tipo))
  }
})

export const RegistroScreen = connect(mapStateToProps, mapDispatchToProps)(Registro)


