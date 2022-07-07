
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
import { validacionPerfil } from "../../helpers/validacionPerfil";
import { inicioGuardarPerfil } from "../../acciones/perfiles";

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
                    id="longitud"
                    label="Longitud"
                    value={values.longitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.longitud ? errors.longitud : ""}
                    error={touched.longitud && Boolean(errors.longitud)}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="latitud"
                    label="Latitud"
                    value={values.latitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.latitud ? errors.latitud : ""}
                    error={touched.latitud && Boolean(errors.latitud)}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
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

const Canton = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initialValues ? props.initialValues[0]?.id : null,
    nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    longitud: props.initialValues ? props.initialValues[0]?.logitud : "",
    latitud: props.initialValues ? props.initialValues[0]?.latitud : "",
  }),
 
  validationSchema: validacionPerfil,

  handleSubmit: (values, { props, setSubmitting }) => {
    props.registroDePerfil(values, props.tipo);
    setSubmitting(false);
  }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  initialValues: state.geografia.elemento,
  tipo: state.geografia.tipo,
  tipoGeografia: state.geografia.tipoGeografia
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDePerfil: (values, tipo) => {
    // dispatch(inicioGuardarPerfil(values, tipo))
  }
})

export const CantonForm = connect(mapStateToProps, mapDispatchToProps)(Canton)


