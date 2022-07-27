
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
import { ProvinciaSelect } from "./ProvinciaSelect"
import { CantonSelect } from "./CantonSelect";
import { ParroquiaSelect } from "./ParroquiaSelect";
import { ComunidadSelect } from "./ComunidadSelect";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { OrganizacionSelect } from "./OrganizacionSelect";
import { OcupacionSelect } from "./OcupacionSelect";

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
    tipo,
    setFieldValue
  } = props;

  return (
    <div >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
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
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <ProvinciaSelect />
                </Grid>
                <Grid item xs={12} md={3}>
                  <CantonSelect />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ParroquiaSelect />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ComunidadSelect />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nombre"
                    name="nombre"
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="ruc"
                    name="ruc"
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="legalizado"
                    select
                    name='legalizado'
                    label="Legalizado"
                    value={values.legalizado}
                    onChange={handleChange}
                    // helperText="Estado de la finca"
                    margin="dense"
                    variant="outlined"
                    sx={{ width: 200 }}
                  >
                    {tiposLegalizado.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="propietario"
                    name="propietario"
                    label="Propietario"
                    value={values.propietario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.propietario ? errors.propietario : ""}
                    error={touched.propietario && Boolean(errors.propietario)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="promotor"
                    name="promotor"
                    label="Promotor"
                    value={values.promotor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.promotor ? errors.promotor : ""}
                    error={touched.promotor && Boolean(errors.promotor)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                  <OrganizacionSelect name='organizacionid' />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                  <OcupacionSelect name='tipoocupacionid'/>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    id="mail"
                    name="mail"
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

                <Grid item xs={12} sm={5}>
                  <TextField
                    id="telefono"
                    name="telefono"
                    label="Teléfono"
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="area"
                    name="area"
                    label="Área"
                    value={values.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.area ? errors.area : ""}
                    error={touched.area && Boolean(errors.area)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="altura"
                    name="altura"
                    label="Altura"
                    value={values.altura}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.altura ? errors.altura : ""}
                    error={touched.altura && Boolean(errors.altura)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="longitud"
                    name="longitud"
                    label="Longitud"
                    value={values.longitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.longitud ? errors.longitud : ""}
                    error={touched.longitud && Boolean(errors.longitud)}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="latitud"
                    name="latitud"
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

                <Grid item xs={12} sm={5}>
                  <TextField
                    id="direccion"
                    name="direccion"
                    label="Dirección"
                    name='direccion'
                    multiline
                    minRows={2}
                    maxRows={3}
                    // inputProps={{ style: { textTransform: 'lowercase' } }}
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="referencia"
                    name="referencia"
                    label="Referencia"
                    name='referencia'
                    multiline
                    minRows={2}
                    maxRows={3}
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="observaciones"
                    name="observaciones"
                    label="Observaciones"
                    name='observaciones'
                    multiline
                    minRows={2}
                    maxRows={3}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="entrevistado"
                    name="entrevistado"
                    label="Entrevistado"
                    value={values.entrevistado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.entrevistado ? errors.entrevistado : ""}
                    error={touched.entrevistado && Boolean(errors.entrevistado)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      label="Fecha entrevista"
                      id="fecha"
                      inputFormat="DD/MM/yyyy"
                      value={values.fecha}
                      onChange={(val) => {
                        setFieldValue('fecha', val);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button type="submit" color='success' fullWidth variant="contained"
                  sx={{ mt: 1, maxWidth: 200 }} startIcon={<FontAwesomeIcon icon={faSave} />}
                >
                  {tipo === -1 ? 'Guardar' : 'Actualizar'}
                </Button>
              </Box>
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
    id: props.initialValues ? props.initialValues?.id : null,
    mail: props.initialValues ? props.initialValues?.mail : "",
    nombre: props.initialValues ? props.initialValues?.nombre : "",
    telefono: props.initialValues ? props.initialValues?.telefono : "",
    ruc: props.initialValues ? props.initialValues?.ruc : "",
    fechaInicio: props.initialValues ? props.initialValues?.fechaInicio : moment().minutes(0).seconds(0).toDate(),
    fechaFin: props.initialValues ? props.initialValues?.fechaFin : moment().minutes(0).seconds(0).toDate(),
    fecha: props.initialValues ? props.initialValues?.fecha : moment().minutes(0).seconds(0).toDate(),
    legalizado: props.initialValues ? props.initialValues?.legalizado : "S",
    direccion: props.initialValues ? props.initialValues?.direccion : "",
    referencia: props.initialValues ? props.initialValues?.referencia : "",
    observaciones: props.initialValues ? props.initialValues?.observaciones : "",
    comunidadid: props.comunidad ? props.comunidad : 1,
    organizacionid: props.initialValues ? props.initialValues?.organizacionid : 9999,
    institucionid: props.initialValues ? props.initialValues?.institucionid : 9999,
    tipoocupacionid: props.initialValues ? props.initialValues?.tipoocupacionid : 1,
    propietario: props.initialValues ? props.initialValues?.propietario : "",
    promotor: props.initialValues ? props.initialValues?.promotor : "",
    entrevistado: props.initialValues ? props.initialValues?.entrevistado : "",
    latitud: props.initialValues ? props.initialValues?.latitud : 0,
    longitud: props.initialValues ? props.initialValues?.longitud : 0,
    area: props.initialValues ? props.initialValues?.area : 0,
    altura: props.initialValues ? props.initialValues?.altura : 0,
  }),

  validationSchema: validacionFinca,

  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log("values-> ", values)
    values.area = parseInt(values.area);
    values.altura = parseInt(values.altura);
    values.longitud = parseFloat(values.longitud);
    values.latitud = parseFloat(values.latitud);
    props.registroDeFinca(values, props.tipo);
    setSubmitting(false);
  }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  initialValues: state.fincas.finca,
  tipo: state.fincas.tipo,
  comunidad: state.geografia.comunidadSeleccionada
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDeFinca: (values, tipo) => {
    dispatch(guardarFinca(values, tipo))
  }
})

export const FincaForm = connect(mapStateToProps, mapDispatchToProps)(Finca)