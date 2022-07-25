
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
                    id="codigo"
                    label="Código"
                    value={values.codigo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.codigo ? errors.codigo : ""}
                    error={touched.codigo && Boolean(errors.codigo)}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="descripcion"
                    label="Descripción"
                    name='descripcion'
                    multiline
                    minRows={2}
                    maxRows={3}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descripcion}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion ? errors.descripcion : ''}
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

const Perfil = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initialValues ? props.initialValues[0]?.id : null,
    nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    descripcion: props.initialValues ? props.initialValues[0]?.descripcion : "",
    codigo: props.initialValues ? props.initialValues[0]?.codigo : "",
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
  initialValues: state.perfiles.perfilSeleccionado,
  tipo: state.perfiles.tipo
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDePerfil: (values, tipo) => {
    dispatch(inicioGuardarPerfil(values, tipo))
  }
})

export const FormularioPerfil = connect(mapStateToProps, mapDispatchToProps)(Perfil)


