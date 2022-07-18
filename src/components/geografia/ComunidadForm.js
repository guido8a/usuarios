
import { withFormik } from "formik";

import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux'
import { validacionParroquia } from "../../helpers/validacionParroquia";
import { guardarComunidad } from "../../acciones/geografia";

const form = props => {

  const theme = createTheme();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    tipo
  } = props;

  return (
    <div >
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="nombre"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.nombre ? errors.nombre : ""}
                    error={touched.nombre && Boolean(errors.nombre)}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="numero"
                    label="Número"
                    value={values.numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.numero ? errors.numero : ""}
                    error={touched.numero && Boolean(errors.numero)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="logitud"
                    label="Longitud"
                    value={values.logitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.logitud ? errors.logitud : ""}
                    error={touched.logitud && Boolean(errors.logitud)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="latitud"
                    label="Latitud"
                    value={values.latitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.latitud ? errors.latitud : ""}
                    error={touched.latitud && Boolean(errors.latitud)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button type="submit" color='success' fullWidth variant="contained"
                sx={{ mt: 3, mb: 2 }} startIcon={<FontAwesomeIcon icon={faSave} />}
              >
                {tipo === -1 ? 'Guardar' : 'Actualizar'}
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div >
  );
};

const Comunidad = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initialValues ? props.initialValues[0]?.id : null,
    parroquiaId: props.initialValues ? props.initialValues[0]?.parroquiaId : (props.tipoGeografia === 3 ? props.seleccionado : null),
    numero: props.initialValues ? props.initialValues[0]?.numero : "0",
    nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    logitud: props.initialValues ? props.initialValues[0]?.logitud : 0,
    latitud: props.initialValues ? props.initialValues[0]?.latitud : 0,
  }),

  validationSchema: validacionParroquia,

  handleSubmit: (values, { props, setSubmitting }) => {
    values.nombre = values.nombre.toUpperCase();
    values.logitud = parseFloat(values.logitud);
    values.latitud = parseFloat(values.latitud);
    props.registroDeComunidad(values, props.tipo);
    setSubmitting(false);
  }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  initialValues: state.geografia.elemento,
  tipo: state.geografia.tipo,
  tipoGeografia: state.geografia.tipoGeografia,
  seleccionado: state.geografia.seleccionado
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDeComunidad: (values, tipo) => {
    dispatch(guardarComunidad(values, tipo));
  }
})

export const ComunidadForm = connect(mapStateToProps, mapDispatchToProps)(Comunidad)


