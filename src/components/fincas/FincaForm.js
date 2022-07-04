
import { withFormik } from "formik";
import React from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux'
import { validacionFinca } from "../../helpers/validacionFinca";
import { guardarFinca } from "../../acciones/fincas";

const tiposLegalizado = [{ value: 'S', label: "Si" }, { value: 'N', label: 'No' },]

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
                    id="ruc"
                    label="RUC"
                    value={values.ruc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.ruc ? errors.ruc : ""}
                    error={touched.ruc && Boolean(errors.ruc)}
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
                <Grid item xs={12}>
                  <TextField
                    id="telefono"
                    label="telefono"
                    value={values.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.telefono ? errors.telefono : ""}
                    error={touched.telefono && Boolean(errors.telefono)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
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
                <Grid item xs={12}>
                  <TextField
                    id="observaciones"
                    label="Observaciones"
                    name='observaciones'
                    multiline
                    minRows={2}
                    maxRows={3}
                    inputProps={{ style: { textTransform: 'lowercase' } }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.observaciones}
                    error={touched.observaciones && Boolean(errors.observaciones)}
                    helperText={touched.observaciones ? errors.observaciones : ''}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    id="legalizado"
                    select
                    name='legalizado'
                    label="Legalizado"
                    value={values.legalizado}
                    onChange={handleChange}
                    helperText="Seleccione el estado de la finca"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  >
                    {tiposLegalizado.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button type="submit" color='success' fullWidth variant="contained"
                sx={{ mt: 1}} startIcon={<FontAwesomeIcon icon={faSave} />}
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

const Finca = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initialValues ? props.initialValues[0]?.id : null,
    mail: props.initialValues ? props.initialValues[0]?.mail : "",
    nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    telefono: props.initialValues ? props.initialValues[0]?.telefono : "",
    ruc: props.initialValues ? props.initialValues[0]?.ruc : "",
    fechaInicio: props.initialValues ? props.initialValues[0]?.fechaInicio : moment().minutes(0).seconds(0).toDate(),
    fechaFin: props.initialValues ? props.initialValues[0]?.fechaFin : moment().minutes(0).seconds(0).toDate(),
    legalizado: props.initialValues ? props.initialValues[0]?.legalizado : "S",
    direccion: props.initialValues ? props.initialValues[0]?.direccion : "",
    referencia: props.initialValues ? props.initialValues[0]?.referencia : "",
    observaciones: props.initialValues ? props.initialValues[0]?.observaciones : "",
    comunidadid: props.initialValues ? props.initialValues[0]?.comunidadid : 1,
    organizacionid: props.initialValues ? props.initialValues[0]?.organizacionid : 9999,
    institucionid: props.initialValues ? props.initialValues[0]?.institucionid : 9999
  }),

  validationSchema: validacionFinca,

  handleSubmit: (values, { props, setSubmitting }) => {
    props.registroDeFinca(values, props.tipo);
    setSubmitting(false);
  }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  initialValues: state.fincas.finca,
  tipo: state.fincas.tipo
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDeFinca: (values, tipo) => {
    dispatch(guardarFinca(values, tipo))
  }
})

export const FincaForm = connect(mapStateToProps, mapDispatchToProps)(Finca)